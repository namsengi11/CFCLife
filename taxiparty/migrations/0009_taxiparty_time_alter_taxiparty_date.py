# Generated by Django 5.0.1 on 2024-02-16 07:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("taxiparty", "0008_alter_taxiparty_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="taxiparty",
            name="time",
            field=models.TimeField(default=datetime.time(8, 0)),
        ),
        migrations.AlterField(
            model_name="taxiparty",
            name="date",
            field=models.DateField(default=datetime.date(2024, 2, 16)),
        ),
    ]