from pymongo import MongoClient

try:
    client = MongoClient(
        "mongodb+srv://jimmystevo_db_user:TestingDatabase@cluster0.gy3uo1w.mongodb.net/",
        serverSelectionTimeoutMS=10000
    )

    print("Attempting connection...")
    print(client.admin.command("ping"))

except Exception as e:
    import traceback
    traceback.print_exc()