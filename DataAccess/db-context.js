const sql = require('mssql');
const parser = require('mssql-connection-string');

class PeopleDbContext {
    constructor(connectionString, log) {
        log("PeopleDbContext object has been created.");
        this.log = log;
        this.config = parser(connectionString);
        this.getPeople = this.getPeople.bind(this);
    }

    async getPeople() {
        this.log("getPeople function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('select * from People');
        this.log("getPeople function - done")
        return result.recordset;
    }

    async createPerson() {
        this.log("createPerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query("INSERT INTO people (FirstName, LastName, PhoneNumber) VALUES ('Cezary', 'Glaz', '111111111');");
        this.log("createPerson function - done")
        return result.recordset;
    }

    async updatePerson() {
        this.log("updatePerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query("UPDATE people SET FirstName = 'Marcin' WHERE PersonId = 1;");
        this.log("updatePerson function - done")
        return result.recordset;
    }

    async deletePerson() {
        this.log("deletePerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query("DELETE FROM people WHERE FirstName='Cezary';");
        this.log("deletePerson function - done")
        return result.recordset;
    }
}

module.exports = PeopleDbContext;