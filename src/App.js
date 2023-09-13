import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EditLicensePlate from "./pages/EditLicensePlate";
import Cameras from "./pages/Cameras";
import LicensePlates from "./pages/LicensePlates";
import CameraBroadcast from "./pages/CameraBroadcast";
import NotFound from "./pages/errorPages/NotFound";
import { ToasterProvider } from "./components/ToasterProvider";
import AdminRoute from "./routes/AdminRoute";
import UserList from "./pages/admin/UserList";
import EditUser from "./pages/admin/EditUser";
import CameraList from "./pages/admin/CameraList";
import EditCamera from "./pages/admin/EditCamera";
import AddCamera from "./pages/admin/AddCamera";
import AddLicensePlate from "./pages/admin/AddLicensePlate";

function App() {
  return (
    <ToasterProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/register/" element={<Registration />} />
        <Route
          path="/profile/:profileId/"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/edit/"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/cameras/"
          element={
            <ProtectedRoute>
              <Cameras />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/cameras/:cameraId/broadcast/"
          element={
            <ProtectedRoute>
              <CameraBroadcast />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/cameras/:cameraId/license_plates/"
          element={
            <ProtectedRoute>
              <LicensePlates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:profileId/cameras/:cameraId/license_plates/:licensePlateId/edit"
          element={
            <ProtectedRoute>
              <EditLicensePlate />
            </ProtectedRoute>
          }
        />

        <Route
          path="profile/:profileId/users/:userId/edit"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditUser />
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:profileId/users/"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <UserList />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="profile/:profileId/all_cameras/"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CameraList />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="profile/:profileId/all_cameras/:cameraId/edit"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditCamera />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="profile/:profileId/all_cameras/:cameraId/broadcast"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CameraBroadcast />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="profile/:profileId/all_cameras/:cameraId/license_plates"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <LicensePlates />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

      <Route
          path="profile/:profileId/all_cameras/:cameraId/license_plates/:licensePlateId/edit/"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditLicensePlate />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

      <Route
          path="profile/:profileId/all_cameras/create/"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AddCamera />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="profile/:profileId/all_cameras/:cameraId/license_plates/create"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AddLicensePlate />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ToasterProvider>
  );
}

export default App;
