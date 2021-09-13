SELECT * FROM todo;

create TABLE user_day(
	user_id CHAR(20) NOT NULL,
	regdt DATE NOT NULL DEFAULT CURDATE() UNIQUE
);

CREATE TABLE todo(
	t_board INT NOT NULL,
	t_text CHAR(100) NOT NULL,
	done BOOLEAN,
	regdt DATE NOT NULL DEFAULT CURDATE(),
	FOREIGN KEY (regdt) REFERENCES user_day(regdt),
	PRIMARY KEY (t_board)
);

DROP TABLE user_day;
DROP TAhebeBLE todo;

INSERT INTO user_day
(user_id,regdt)
VALUES
("hi","2021-07-28");

INSERT INTO todo
(t_board,t_text,done,regdt)
VALUES
(3,"sadas",false,"2021-07-29");

SELECT * FROM todo WHERE regdt = "2021-07-29";
SELECT * FROM todo WHERE regdt = "2021-07-29"; 
