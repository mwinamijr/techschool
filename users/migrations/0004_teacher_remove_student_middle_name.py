# Generated by Django 5.1.1 on 2024-09-09 12:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_student'),
    ]

    operations = [
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=150, null=True, verbose_name='First Name')),
                ('last_name', models.CharField(max_length=150, null=True, verbose_name='Last Name')),
                ('gender', models.CharField(blank=True, choices=[('Male', 'Male'), ('Female', 'Female'), ('Other', 'Other')], max_length=10, null=True)),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('image', models.ImageField(blank=True, upload_to='StudentsImages')),
                ('password', models.CharField()),
            ],
        ),
        migrations.RemoveField(
            model_name='student',
            name='middle_name',
        ),
    ]
