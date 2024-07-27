from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .serializers import TaskSerializer
from .models import Task

# Create your views here.

class TaskListView(generics.ListAPIView):
    queryset=Task.objects.all()
    serializer_class = TaskSerializer


class GetTasks(APIView):

    def get(self, request, format=None):
        tasks = Task.objects.all()

        task_objects= []

        for task in tasks:
            task_objects.append({
                "name": task.name,
                "id": task.id
            })

        return Response({"tasks": task_objects}, status=status.HTTP_200_OK)
    
class CreateTask(APIView):

    def post(self, request, format=None):

        name = self.request.data.get("name")

        if name == None:
            return Response({"Bad Request": "No task name given..."}, status=status.HTTP_400_BAD_REQUEST)
        task = Task(name=name)
        task.save()
        return Response({"message": "task created!"}, status=status.HTTP_201_CREATED)
    
class DeleteTask(APIView):

    def delete(self, request, id, format=None):
        tasks = Task.objects.filter(id=id)
        if len(tasks)>0:
            tasks[0].delete()
            return Response({"message": "task successfully deleted!"}, status=status.HTTP_200_OK)
        return Response({"Bad Request": "Task does not exist..."}, status=status.HTTP_400_BAD_REQUEST)