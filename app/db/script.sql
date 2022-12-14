CREATE TABLE IF NOT EXISTS public.interesado
(
    id_interesado integer NOT NULL DEFAULT nextval('interesado_id_interesado_seq'::regclass),
    nombre character varying(30) COLLATE pg_catalog."default",
    apellido character varying(30) COLLATE pg_catalog."default",
    telefono character varying(35) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    direccion character varying(40) COLLATE pg_catalog."default",
    numero integer,
    dni character varying COLLATE pg_catalog."default",
    localidad character varying COLLATE pg_catalog."default",
    fecharegistro date DEFAULT now(),
    CONSTRAINT interesado_pkey PRIMARY KEY (id_interesado)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.interesado
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.curso
(
    id_curso integer NOT NULL DEFAULT nextval('curso_id_curso_seq'::regclass),
    nombre character varying(100) COLLATE pg_catalog."default",
    CONSTRAINT curso_pkey PRIMARY KEY (id_curso)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.curso
    OWNER to postgres;


CREATE TABLE IF NOT EXISTS public.interesados_curso
(
    id integer NOT NULL DEFAULT nextval('interesados_curso_id_seq'::regclass),
    id_interesado integer NOT NULL,
    id_curso integer NOT NULL,
    CONSTRAINT interesados_curso_pkey PRIMARY KEY (id_interesado),
    CONSTRAINT curso FOREIGN KEY (id_curso)
        REFERENCES public.curso (id_curso) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT interesado FOREIGN KEY (id_interesado)
        REFERENCES public.interesado (id_interesado) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.interesados_curso
    OWNER to postgres;