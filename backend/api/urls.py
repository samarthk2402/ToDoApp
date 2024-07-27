from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path("tasks", TaskListView.as_view()),
    path("create-task", CreateTask.as_view()),
    path("get-tasks", GetTasks.as_view()),
    path("delete-task/<int:id>", DeleteTask.as_view())
]
