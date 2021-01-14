DROP TABLE IF EXISTS player;

CREATE TABLE player (
    player_id INT PRIMARY KEY,
    `first` VARCHAR(255), 
    lastname VARCHAR(255), 
    img VARCHAR(255), 
    birthdate DATE
);

DROP TABLE IF EXISTS season;

CREATE TABLE season (
    season  INT PRIMARY KEY,
    year    YEAR,
    current BOOLEAN,
    title   VARCHAR(255)
);

DROP TABLE IF EXISTS gm;

CREATE TABLE gm (
    gm_id   INT PRIMARY KEY,
    nick    VARCHAR(255),	 
    debut   INT,	 
    steam   VARCHAR(255),
    FOREIGN KEY (debut) REFERENCES season(season)
);

DROP TABLE IF EXISTS team;

CREATE TABLE team (
    team_id   INT PRIMARY KEY,
    name      VARCHAR(255),	 
    short     VARCHAR(255),	 
    code      CHAR(3),
    color1    CHAR(7),
    color2    CHAR(7),
    font1     CHAR(7),
    font2     CHAR(7),
    old_id    INT UNSIGNED,	 
    start     INT,
    end       INT,
    logo      VARCHAR(255),
    FOREIGN KEY (start) REFERENCES season(season),
    FOREIGN KEY (end) REFERENCES season(season)
);

DROP TABLE IF EXISTS game;

CREATE TABLE game (
    game_id     INT PRIMARY KEY,
    season      INT,
    home        INT,
    away        INT,
    date        DATE,
    type        ENUM('reg','po','cup','asg'),
    FOREIGN KEY (season) REFERENCES season(season),
    FOREIGN KEY (home) REFERENCES team(team_id),
    FOREIGN KEY (away) REFERENCES team(team_id)
);


