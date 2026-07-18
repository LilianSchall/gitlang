from dataclasses import dataclass
from duckdb import DuckDBPyConnection

@dataclass
class Language:
    name: str
    id: int | None = None

    @staticmethod
    def create_table(conn: DuckDBPyConnection) -> None:
        """
        Creates the languages table in the database if it does not already exist.
        Args:
            conn (DuckDBPyConnection): The database connection.
        """
        query = """
        CREATE TABLE IF NOT EXISTS languages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        );
        """
        conn.execute(query)

    def into_database(self, conn: DuckDBPyConnection) -> None:
        """
        Inserts the language entry into the database and updates the id attribute with the generated id.
        Args:
            conn (DuckDBPyConnection): The database connection.
        Raises:
            ValueError: If the insertion fails and no id is returned.
        """
        query = """
        INSERT INTO languages (name)
        VALUES (?)
        RETURNING id;
        """
        result = conn.execute(query, (self.name,)).fetchone()
        if result is None or result[0] is None:
            raise ValueError("Failed to insert language into database.")
        self.id = result[0]
