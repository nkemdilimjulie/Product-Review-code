## Explanation of One-to-One and One-to-Many Relationships in `Reviews` 

Model
📌 One-to-Many Relationships
1. `phone = models.ForeignKey(Mobiles, on_delete=models.CASCADE)`

+ **What does it mean?**
    + A **single mobile phone** (`Mobiles`) can have multiple reviews (`Reviews`), but **each review is associated with only one phone.**
+ **Why is it One-to-Many?**
    + A **ForeignKey** creates a **Many-to-One** relationship (i.e., multiple `Reviews` can reference the same `Mobiles` instance).
+ **Example:**
```
Samsung Galaxy S23  → Review 1 (⭐⭐⭐⭐)
                    → Review 2 (⭐⭐⭐)
                    → Review 3 (⭐⭐⭐⭐⭐)
```
2. `author = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)`

+ **What does it mean?**
    + A **single user** (`CustomUser`) can write **multiple reviews**, b**ut each review belongs to one user.**
+ **Why is it One-to-Many?**
    + One user can review many phones, but each review is written by one specific user.
+ **Example:**

```
User JohnDoe  → Review 1 (iPhone 15)
              → Review 2 (Samsung S23)
              → Review 3 (Google Pixel 8)
```
📌 **One-to-One Relationship (Missing in Your Model)**

**`(Please, see P24-E04/FINAL PROJECT/Product Review code README tips and info/3 Reviews Relationships) TO CONTINUE FORMATTING LATER`**

Currently, your Reviews model does not have a One-to-One relationship.
A One-to-One relationship means that one model can have only one related instance in another model.
Example (if we add a response feature):
python
Copy
Edit
class ReviewResponse(models.Model):
    review = models.OneToOneField(Reviews, on_delete=models.CASCADE)
    response_text = models.TextField()
Now, each review can have only one response from the seller.
🔹 Summary
Relationship Type	Model Field	Explanation
One-to-Many	phone = models.ForeignKey(Mobiles, on_delete=models.CASCADE)	A phone can have multiple reviews, but a review belongs to one phone.
One-to-Many	author = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL)	A user can write multiple reviews, but a review belongs to one user.
One-to-One (Missing)	(If needed: review_response = models.OneToOneField(Reviews, on_delete=models.CASCADE))	Each review can have one response from a seller.
Would you like to add a One-to-One relationship somewhere? 🚀




>**self.review.id: Displays the id of the related Review instance.
self.response_text[:50]: Displays the first 50 characters of the response text. This is useful in cases where the response text is long, and you want to display only a preview.**


### Permissions for security:
+ `IsAdminOrReadOnly` → Admins can modify, others can read (Accounts & Marketers)
+ `IsAuthenticatedOrReadOnly` → Authenticated users can add data, others can read (Mobiles)
+ `IsAuthorOrReadOnly` → Only the review author can modify their reviews (Reviews)



### Changes & Explanation
+ ✅ IsAdminOrReadAndPostOnly Permission Class

    + **GET (Read) and POST (Create)**: Allowed for all users.
    + **PUT, PATCH, DELETE** (Modify): Allowed only for admin users (is_staff=True).
+ ✅ marketers/urls.py

    + Exposes an API endpoint for MarketerList (/api/marketers/).
    + Uses format_suffix_patterns() to support optional format suffixes (e.g., .json, .api).

These `admin.py` files will:

+ Register your models in Django Admin.
+ Allow easy searching, filtering, and displaying related fields.
+ Handle ManyToManyField relationships efficiently.