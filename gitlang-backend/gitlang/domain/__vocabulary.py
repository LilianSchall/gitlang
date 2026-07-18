from dataclasses import dataclass
from duckdb import DuckDBPyConnection

@dataclass
class Vocabulary:
    word_in_target_language: str
    word_in_native_language: str
    word_in_english_language: str
    native_language_id: int
    target_language_id: int
    exemple_sentence: str
    definition: str | None = None
    id: int | None = None
    embedding: bytes | None = None

    @staticmethod
    def create_table(conn: DuckDBPyConnection) -> None:
        """
        Creates the vocabulary table in the database if it does not already exist.
        Args:
            conn (DuckDBPyConnection): The database connection.
        """
        query = """
        CREATE TABLE IF NOT EXISTS vocabulary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word_in_target_language TEXT NOT NULL,
            word_in_native_language TEXT NOT NULL,
            word_in_english_language TEXT NOT NULL,
            native_language_id INTEGER NOT NULL,
            target_language_id INTEGER NOT NULL,
            exemple_sentence TEXT NOT NULL,
            definition TEXT,
            embedding BLOB,
            FOREIGN KEY (native_language_id) REFERENCES languages(id),
            FOREIGN KEY (target_language_id) REFERENCES languages(id)
        );
        """
        conn.execute(query)

    def into_database(self, conn: DuckDBPyConnection) -> None:
        """
        Inserts the vocabulary entry into the database and updates the id attribute with the generated id.
        Args:
            conn (DuckDBPyConnection): The database connection.
        Raises:
            ValueError: If the insertion fails and no id is returned.
        """
        query = """
        INSERT INTO vocabulary (
            word_in_target_language,
            word_in_native_language,
            word_in_english_language,
            native_language_id,
            target_language_id,
            exemple_sentence,
            definition,
            embedding
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING id;
        """
        result = conn.execute(query, (
            self.word_in_target_language,
            self.word_in_native_language,
            self.word_in_english_language,
            self.native_language_id,
            self.target_language_id,
            self.exemple_sentence,
            self.definition,
            self.embedding
        )).fetchone()

        if result is None:
            raise ValueError("Failed to insert vocabulary entry into database.")
        self.id =  result[0]




