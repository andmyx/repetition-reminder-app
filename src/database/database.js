import React from "react";
import * as SQLite from "expo-sqlite";

let db = SQLite.openDatabase("testdatabas.db");


function createDB() {
    // Create reminders table
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists reminders (id integer primary key not null, subject text, title text, body text, tags text);"
        );
    })
    // Create tags table
    db.transaction(tx => {
        tx.executeSql(
            "create table if not exists tags (id integer primary key not null, name text);"
        );
    })
}

function addReminderToDB(values) {
    db.transaction(
        tx => {
            tx.executeSql(
                "insert into reminders (subject, title, body, tags) values (?, ?, ?, ?)",
                [values.subject, values.title, values.body, values.tags]
            );
        }
    )
}

function loadRemindersFromDB(setFunc) {
    db.transaction(
        tx => {
            tx.executeSql(
                "select * from reminders",
                [],
                (_, { rows: { _array } }) => {
                    setFunc(_array.reverse());
                }
            );
        }
    )
}

function addTagsToDB(values) {
    db.transaction(
        tx => {
            tx.executeSql(
                "insert into tags (name) values (?)",
                [values.name]
            );
        }
    )
}

function loadTagsFromDB(setFunc) {
    db.transaction(
        tx => {
            tx.executeSql(
                "select * from tags",
                [],
                (_, { rows: { _array } }) => {
                    setFunc(_array.reverse());
                }
            )
        }
    )
}

export { createDB, addReminderToDB, loadRemindersFromDB, addTagsToDB, loadTagsFromDB };