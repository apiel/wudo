--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)

-- Started on 2018-09-12 14:24:42 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 13041)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2944 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 198 (class 1259 OID 16442)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    text character varying NOT NULL,
    "user" character varying NOT NULL,
    "creationDate" timestamp without time zone NOT NULL,
    "idPost" integer NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16505)
-- Name: postTags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."postTags" (
    "idPost" integer NOT NULL,
    "idTag" integer NOT NULL,
    "postIdPost" integer,
    "tagIdTag" integer
);


ALTER TABLE public."postTags" OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16453)
-- Name: post_idPost_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."post_idPost_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."post_idPost_seq" OWNER TO postgres;

--
-- TOC entry 2945 (class 0 OID 0)
-- Dependencies: 199
-- Name: post_idPost_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."post_idPost_seq" OWNED BY public.post."idPost";


--
-- TOC entry 200 (class 1259 OID 16490)
-- Name: post_tags_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_tags_tag (
    "postIdPost" integer NOT NULL,
    "tagIdTag" integer NOT NULL
);


ALTER TABLE public.post_tags_tag OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16390)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    "idTag" integer NOT NULL,
    name character varying NOT NULL,
    "creationDate" timestamp without time zone NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 16388)
-- Name: tag_idTag_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tag_idTag_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."tag_idTag_seq" OWNER TO postgres;

--
-- TOC entry 2946 (class 0 OID 0)
-- Dependencies: 196
-- Name: tag_idTag_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tag_idTag_seq" OWNED BY public.tag."idTag";


--
-- TOC entry 2803 (class 2604 OID 16455)
-- Name: post idPost; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN "idPost" SET DEFAULT nextval('public."post_idPost_seq"'::regclass);


--
-- TOC entry 2802 (class 2604 OID 16393)
-- Name: tag idTag; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN "idTag" SET DEFAULT nextval('public."tag_idTag_seq"'::regclass);


--
-- TOC entry 2809 (class 2606 OID 16494)
-- Name: post_tags_tag PK_068df6138bc6f2bb7e6013a4c89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "PK_068df6138bc6f2bb7e6013a4c89" PRIMARY KEY ("postIdPost", "tagIdTag");


--
-- TOC entry 2811 (class 2606 OID 16509)
-- Name: postTags PK_618c9e6c3e0ac10f1db914f1d51; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postTags"
    ADD CONSTRAINT "PK_618c9e6c3e0ac10f1db914f1d51" PRIMARY KEY ("idPost", "idTag");


--
-- TOC entry 2807 (class 2606 OID 16463)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY ("idPost");


--
-- TOC entry 2805 (class 2606 OID 16398)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY ("idTag");


--
-- TOC entry 2813 (class 2606 OID 16500)
-- Name: post_tags_tag FK_0cb1e0b81d8bcd6698f25260ba8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "FK_0cb1e0b81d8bcd6698f25260ba8" FOREIGN KEY ("tagIdTag") REFERENCES public.tag("idTag") ON DELETE CASCADE;


--
-- TOC entry 2812 (class 2606 OID 16495)
-- Name: post_tags_tag FK_2252c10d4aba1b4546cb5f53a82; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "FK_2252c10d4aba1b4546cb5f53a82" FOREIGN KEY ("postIdPost") REFERENCES public.post("idPost") ON DELETE CASCADE;


--
-- TOC entry 2814 (class 2606 OID 16510)
-- Name: postTags FK_53567f8dd5f5e104262bf8a5293; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postTags"
    ADD CONSTRAINT "FK_53567f8dd5f5e104262bf8a5293" FOREIGN KEY ("postIdPost") REFERENCES public.post("idPost");


--
-- TOC entry 2815 (class 2606 OID 16515)
-- Name: postTags FK_8f4c47aee09ad7f0b0d523484f3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postTags"
    ADD CONSTRAINT "FK_8f4c47aee09ad7f0b0d523484f3" FOREIGN KEY ("tagIdTag") REFERENCES public.tag("idTag");


-- Completed on 2018-09-12 14:24:42 CEST

--
-- PostgreSQL database dump complete
--

