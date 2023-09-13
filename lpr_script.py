import cv2
import numpy as np
import pytesseract
import datetime
import time
from picamera.array import PiRGBArray
from picamera import PiCamera
import threading
import re
import requests
import base64
from io import BytesIO
import datetime
import os

# detect region based on LP
def detect_ukraine_region(license_plate):
    ukraine_regions = {
        'АР Крим': ['AK', 'KK'],
        'Вінницька область': ['AB', 'KB'],
        'Волинська область': ['AC', 'KC'],
        'Дніпропетровська область': ['AE', 'KE'],
        'Донецька область': ['AH', 'KH'],
        'Житомирська область': ['AM', 'KM'],
        'Закарпатська область': ['AO', 'KO'],
        'Запорізька область': ['AP', 'KP'],
        'Івано-Франківська область': ['AT', 'KT'],
        'Київська область': ['AI', 'KI'],
        'м. Київ': ['AA', 'KA'],
        'Кіровоградська область': ['BA', 'HA'],
        'Луганська область': ['BB', 'HB'],
        'Львівська область': ['BC', 'HC'],
        'Миколаївська область': ['BE', 'HE'],
        'Одеська область': ['BH', 'HH'],
        'Полтавська область': ['BI', 'HI'],
        'Рівненська область': ['BK', 'HK'],
        'Сумська область': ['BM', 'HM'],
        'Тернопільська область': ['BO', 'HO'],
        'Харківська область': ['AX', 'KX'],
        'Херсонська область': ['BT', 'HT'],
        'Хмельницька область': ['BX', 'HX'],
        'Черкаська область': ['CA', 'IA'],
        'Чернігівська область': ['CB', 'IB'],
        'Чернівецька область': ['CE', 'IE'],
        'м. Севастополь': ['CH', 'HH']
    }

    for region, letters in ukraine_regions.items():
        for letter in letters:
            if license_plate.startswith(letter):
                return region

    return 


def validate_license_plate(plate_number):
    pattern = r'^[A-Zl1]{2}\d{4}[A-Zl1]{2}$'
    if re.match(pattern, plate_number):
        return True
    else:
        return False


# POST querry function
def send_post_request(region, license_plate_text, country, camera, image):
    url = "################"
    
    imencoded = cv2.imencode('.jpg', image)[1]
    
    current_datetime = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')

    multipart_form_data = { "camera": (None, camera),
            "region": (None, region),
            "text": (None, license_plate_text),
            "country": (None, country),
            'frame': ('frame' + current_datetime +'.jpg', imencoded.tobytes(), 'image/jpeg') }

    try:
        response = requests.post(url, files=multipart_form_data)
        response.raise_for_status()
        print("POST request sent successfully!")
    except requests.exceptions.RequestException as e:
        print("Error sending POST request:", str(e))


pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'


# Function to recognize license plates
def recognize_license_plate(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Perform adaptive thresholding
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Apply morphological transformations
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    morph = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=1)

    # Find contours in the thresholded image
    contours, _ = cv2.findContours(morph, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    plates = []
    for contour in contours:
        # Approximate the contour as a polygon
        perimeter = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.04 * perimeter, True)

        # Check if the contour is approximately rectangular
        if len(approx) == 4:
            # Calculate the bounding box coordinates
            x, y, w, h = cv2.boundingRect(approx)

            # Filter based on aspect ratio
            aspect_ratio = w / float(h)
            if aspect_ratio > 2.5 and aspect_ratio < 6.0:
                # Crop the license plate region
                plate_image = image[y:y+h, x:x+w]

                # Apply OCR to recognize the plate number
                plate_number = pytesseract.image_to_string(plate_image, config='--psm 7 -l eng --oem 3')
                plate_number = ''.join(e for e in plate_number if e.isalnum())  # Remove non-alphanumeric characters

                # Filter based on character count
                if len(plate_number) == 8:
                    plates.append((x, y, w, h, plate_number))

    for (x, y, w, h, plate_number) in plates:
        if validate_license_plate(plate_number):
            cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)
            cv2.putText(image, plate_number, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
            if not is_plate_on_cooldown(plate_number):
                plate_number = plate_number.replace("l", "I").replace("1","I")
                registration_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print(f"License Plate: {plate_number}")
                print(f"Date and Time: {registration_time}")
                # Detect the region based on the license plate
                region = detect_ukraine_region(plate_number)
                print(f"Region: {region}")
                print("")
                send_post_request(region, plate_number, "Україна", "92777a54-4494-4d28-a377-e4aa295057a6", image) 
                # Set the cooldown for the license plate
                set_plate_cooldown(plate_number)
            else:
                print("LP is on cooldown")
        else:
            print("Recognized some trash")

    return image


# Function for frame processing
def process_frame(frame):
    # Obtain the image array from the frame
    image = frame.array

    # Perform license plate recognition
    output_frame = recognize_license_plate(image)

    # Display the resulting frame
    cv2.imshow('License Plate Recognition', output_frame)

    # Clear the stream for the next frame
    raw_capture.truncate(0)


def is_plate_on_cooldown(plate_number):
    current_time = time.time()
    if plate_number in scanned_plates:
        last_detection_time = scanned_plates[plate_number]
        if current_time - last_detection_time < cooldown_duration:
            return True
    return False


def set_plate_cooldown(plate_number):
    current_time = time.time()
    scanned_plates[plate_number] = current_time


# Frame processing thread function
def frame_processing_thread():
    for frame in camera.capture_continuous(raw_capture, format="bgr", use_video_port=True):
        # Acquire the lock before processing the frame
        lock.acquire()

        # Process the frame
        process_frame(frame)

        # Release the lock
        lock.release()

        # Exit if 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break


cooldown_duration = 120  # Cooldown duration in seconds

# Initialize the PiCamera
camera = PiCamera()
camera.resolution = (640, 480)
camera.framerate = 25
raw_capture = PiRGBArray(camera, size=(640, 480))

# Allow the camera to warm up
time.sleep(2)

# Create a lock to synchronize access to shared resources
lock = threading.Lock()
# Dictionary to store scanned license plates and their last detection timestamps
scanned_plates = {}
# Start the frame processing thread
thread = threading.Thread(target=frame_processing_thread)
thread.daemon = True
thread.start()

# Main thread continues to perform other tasks or wait for completion

# Wait for the frame processing thread to complete
thread.join()

# Release the camera and close all windows
camera.close()
cv2.destroyAllWindows()
