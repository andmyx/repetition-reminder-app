import * as SQLite from "expo-sqlite";

let db = SQLite.openDatabase("testdatabas.db");


function createDB() {
    // Create reminders table
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists reminders (id integer primary key not null, title text, body text, creationtime integer);"
        );
    })
    // Create tags table
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists tags (id integer primary key not null, name text);"
        );
    })
    // create remindersToTags table
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists remindersToTags (id integer primary key not null, reminderID integer, tagID integer);"
        );
    })
}

function addReminderToDB(values, creationTime) {
    db.transaction(
        tx => {
            tx.executeSql(
                "insert into reminders (title, body, creationtime) values (?, ?, ?)",
                [values.title, values.body, creationTime]
            );
        }
    )
}

function createNewReminder(values, creationTime, tags) {
    addReminderToDB(values, creationTime);

    let sqlStatement = "";

    for (i = 0; i < tags.length; i++) {
        let tagID = tags[i].id;

        sqlStatement = sqlStatement.concat("select max(reminders.id), tags.id from reminders join tags where tags.id = ", tagID, " ");

        if (i != tags.length - 1) {
            sqlStatement = sqlStatement.concat("UNION ALL ");
        }
    }

    // create connection between the new reminder and each of its tags
    db.transaction(
        tx => {
            tx.executeSql(
                `insert into remindersToTags (reminderID, tagID) ${sqlStatement}`,
                [],
                (_, { rows: { _array } }) => {
                }
            )
        }
    )

}

function loadRemindersFromDB(setFunc) {
    db.transaction(
        tx => {
            tx.executeSql(
                "select r.id, r.title, r.body, r.creationtime, group_concat(t.name) as tags from reminders as r join remindersToTags on r.id = reminderID join tags as t on t.id = tagID group by r.id order by r.id desc;",
                [],
                (_, { rows: { _array } }) => {
                    setFunc(_array);
                }
            );
        }
    )
}

function deleteReminderFromDB(values) {
    db.transaction(
        tx => {
            tx.executeSql(
                "delete from reminders where id = (?)",
                [values.id]
            )
        }
    )
}

function addTagsToDB(newTag) {
    db.transaction(
        tx => {
            tx.executeSql(
                "insert into tags (name) select (?) where not exists (select 1 from tags where name = (?));",
                [newTag, newTag]
            );
        }
    )
}

function newTagDBHandler(setTags, setSelectedTags, newTag, selectedTags) {
    // insert the new tag into the DB if it doesn't exist
    addTagsToDB(newTag);

    // create a comma-seperated string of the names of 
    // all of the selected tags including the new tag
    let selectedTagsString = "";

    // since we don't know the new tag's id 
    // and we know that the DB doesn't contain duplicate tags
    // I think it's ok to use the name of the tags as the 
    // search parameter instead of the tags' id
    for (let i = 0; i < selectedTags.length; i++) {
        selectedTagsString = selectedTagsString.concat("'", selectedTags[i].name, "'", ",");
    }

    selectedTagsString = selectedTagsString.concat("'", newTag, "'");

    // select all tags that aren't in selectedTags
    db.transaction(
        tx => {
            tx.executeSql(
                `select * from tags except select * from tags where name in (${selectedTagsString}) order by (name) asc`,
                [],
                (_, { rows: { _array } }) => {
                    setTags(_array);
                }
            )
        }
    )

    // select all tags that are in selectedTags
    db.transaction(
        tx => {
            tx.executeSql(
                `select * from tags where (name) in (${selectedTagsString})`,
                [],
                (_, { rows: { _array } }) => {
                    setSelectedTags(_array);
                }
            )
        }
    )
}

function loadTagsFromDB(setTags, setSelectedTags, selectedTags) {
    // create a comma-seperated string containing
    // the id's of every selected tag
    let selectedTagsString = "";

    for (let i = 0; i < selectedTags.length; i++) {
        selectedTagsString = selectedTagsString.concat(selectedTags[i].id, ",");
    }

    selectedTagsString = selectedTagsString.slice(0, -1);

    // select all tags that aren't in selectedTags
    db.transaction(
        tx => {
            tx.executeSql(
                `select * from tags except select * from tags where id in (${selectedTagsString}) order by (name) asc`,
                [],
                (_, { rows: { _array } }) => {
                    setTags(_array);
                }
            )
        }
    )

    // select all tags that are in selectedTags
    db.transaction(
        tx => {
            tx.executeSql(
                `select * from tags where id in (${selectedTagsString}) order by (name) asc`,
                [],
                (_, { rows: { _array } }) => {
                    setSelectedTags(_array);
                }
            )
        }
    )
}

export { createDB, addReminderToDB, createNewReminder, loadRemindersFromDB, deleteReminderFromDB, newTagDBHandler, loadTagsFromDB };