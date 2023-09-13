import pytest
from core.user.models import User


@pytest.mark.django_db
def test_create_user():
    phone = "1234567890"
    email = "test@example.com"
    password = "testpassword"
    first_name = "Павло"
    last_name = "Павленко"

    user = User.objects.create_user(
        phone=phone,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    assert user.phone == phone
    assert user.email == email
    assert user.check_password(password)
    assert user.first_name == first_name
    assert user.last_name == last_name
    assert not user.is_superuser

@pytest.mark.django_db
def test_create_superuser():
    phone = "1234567890"
    email = "admin@example.com"
    password = "adminpassword"
    first_name = "Admin"
    last_name = "User"

    user = User.objects.create_superuser(
        phone=phone,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )

    assert user.phone == phone
    assert user.email == email
    assert user.check_password(password)
    assert user.first_name == first_name
    assert user.last_name == last_name
    assert user.is_superuser


