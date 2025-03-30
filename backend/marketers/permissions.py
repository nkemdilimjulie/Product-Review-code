from rest_framework import permissions


class IsAdminOrReadAndPostOnly(permissions.BasePermission):
    """
    Custom permission:
    - Allow all users to read (GET) and create (POST) marketer data.
    - Only admin users (is_staff=True) can update (PUT/PATCH) or delete (DELETE).
    """

    def has_permission(self, request, view):
        # Allow GET and POST requests for everyone
        if request.method in permissions.SAFE_METHODS:#or request.method == "POST"
        return True
        # Allow only admin users to modify data
        return request.user and request.user.is_staff
