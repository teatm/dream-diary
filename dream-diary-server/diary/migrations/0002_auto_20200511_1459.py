# Generated by Django 3.0.5 on 2020-05-11 14:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='diary',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('price', models.IntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.ItemCategory')),
            ],
        ),
        migrations.CreateModel(
            name='DiaryItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diary', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.Diary')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.Item')),
            ],
        ),
    ]