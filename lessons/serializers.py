from rest_framework import serializers
from .models import ClassLevel, Topic, SubTopic, Lesson, Illustration


class IllustrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Illustration
        fields = ["id", "image", "caption"]


class LessonSerializer(serializers.ModelSerializer):
    illustrations = IllustrationSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = [
            "id",
            "title",
            "content",
            "video_url",
            "visual_config",
            "illustrations",
        ]


class SubTopicSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = SubTopic
        fields = ["id", "title", "description", "lessons"]


class TopicSerializer(serializers.ModelSerializer):
    subtopics = SubTopicSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = ["id", "title", "description", "subtopics"]


class ClassLevelSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = ClassLevel
        fields = ["id", "name", "description", "topics"]
