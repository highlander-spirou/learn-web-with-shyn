q_MONGO_USER=`jq --arg v "$MONGO_INITDB_ROOT_USERNAME" -n '$v'`
q_MONGO_PASSWORD=`jq --arg v "$MONGO_INITDB_ROOT_PASSWORD" -n '$v'`
mongosh -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" <<EOF
    use $MONGO_INITDB_DATABASE;
    db.createCollection("pseudoCollection");
    db.pseudoCollection.insertOne({"firstField":"firstValue"});
EOF