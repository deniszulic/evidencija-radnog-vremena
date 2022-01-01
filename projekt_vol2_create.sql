-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-01-01 15:53:44.171

-- tables
-- Table: KALENDAR
CREATE TABLE KALENDAR (
    id serial  NOT NULL,
    datum_obavljanja_pocetak date  NOT NULL,
    datum_obavljanja_kraj date  NOT NULL,
    br_sati int  NULL,
    prekovremeni int  NULL,
    odsutan int  NULL,
    email varchar(50)  NOT NULL,
    rad_od_kuce char(2)  NULL,
    nocni_rad int  NULL,
    postavljeno bigint  NOT NULL,
    napomena text  NULL,
    blagdan int  NULL,
    KORISNIK_id int  NOT NULL,
    zakljucano boolean  NULL,
    prihvaceno_od_admina boolean  NULL,
    razlog_admin text  NULL,
    CONSTRAINT KALENDAR_pk PRIMARY KEY (id)
);

-- Table: KORISNIK
CREATE TABLE KORISNIK (
    id serial  NOT NULL,
    ime varchar(50)  NULL,
    prezime varchar(50)  NULL,
    email varchar(50)  NOT NULL,
    lozinka varchar(60)  NOT NULL,
    admin boolean  NOT NULL,
    datumReg bigint  NOT NULL,
    CONSTRAINT KORISNIK_ak_1 UNIQUE (email) NOT DEFERRABLE  INITIALLY IMMEDIATE,
    CONSTRAINT KORISNIK_pk PRIMARY KEY (id)
);

-- Table: SLIKA
CREATE TABLE SLIKA (
    KALENDAR_id int  NOT NULL,
    id serial  NOT NULL,
    name text  NOT NULL,
    img bytea  NOT NULL,
    CONSTRAINT SLIKA_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: KALENDAR_KORISNIK (table: KALENDAR)
ALTER TABLE KALENDAR ADD CONSTRAINT KALENDAR_KORISNIK
    FOREIGN KEY (KORISNIK_id)
    REFERENCES KORISNIK (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: SLIKA_KALENDAR (table: SLIKA)
ALTER TABLE SLIKA ADD CONSTRAINT SLIKA_KALENDAR
    FOREIGN KEY (KALENDAR_id)
    REFERENCES KALENDAR (id)
    ON DELETE  CASCADE  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

