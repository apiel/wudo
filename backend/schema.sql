--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)

-- Started on 2018-09-12 22:19:19 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 196 (class 1259 OID 16384)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    text character varying NOT NULL,
    "creationDate" timestamp without time zone NOT NULL,
    "idPost" integer NOT NULL,
    "idUser" integer
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16393)
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
-- TOC entry 2946 (class 0 OID 0)
-- Dependencies: 197
-- Name: post_idPost_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."post_idPost_seq" OWNED BY public.post."idPost";


--
-- TOC entry 198 (class 1259 OID 16395)
-- Name: post_tags_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_tags_tag (
    "postIdPost" integer NOT NULL,
    "tagIdTag" integer NOT NULL
);


ALTER TABLE public.post_tags_tag OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16398)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    "idTag" integer NOT NULL,
    name character varying NOT NULL,
    "creationDate" timestamp without time zone NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16404)
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
-- TOC entry 2947 (class 0 OID 0)
-- Dependencies: 200
-- Name: tag_idTag_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tag_idTag_seq" OWNED BY public.tag."idTag";


--
-- TOC entry 201 (class 1259 OID 16436)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    "idUser" integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    "creationDate" timestamp without time zone NOT NULL,
    avatar bytea,
    "avatarChecksum" character varying
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16443)
-- Name: user_idUser_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."user_idUser_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."user_idUser_seq" OWNER TO postgres;

--
-- TOC entry 2948 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_idUser_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."user_idUser_seq" OWNED BY public."user"."idUser";


--
-- TOC entry 2805 (class 2604 OID 16406)
-- Name: post idPost; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN "idPost" SET DEFAULT nextval('public."post_idPost_seq"'::regclass);


--
-- TOC entry 2806 (class 2604 OID 16407)
-- Name: tag idTag; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN "idTag" SET DEFAULT nextval('public."tag_idTag_seq"'::regclass);


--
-- TOC entry 2807 (class 2604 OID 16445)
-- Name: user idUser; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN "idUser" SET DEFAULT nextval('public."user_idUser_seq"'::regclass);


--
-- TOC entry 2811 (class 2606 OID 16409)
-- Name: post_tags_tag PK_068df6138bc6f2bb7e6013a4c89; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "PK_068df6138bc6f2bb7e6013a4c89" PRIMARY KEY ("postIdPost", "tagIdTag");


--
-- TOC entry 2809 (class 2606 OID 16413)
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY ("idPost");


--
-- TOC entry 2813 (class 2606 OID 16415)
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY ("idTag");


--
-- TOC entry 2815 (class 2606 OID 16449)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY ("idUser");


--
-- TOC entry 2817 (class 2606 OID 16416)
-- Name: post_tags_tag FK_0cb1e0b81d8bcd6698f25260ba8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "FK_0cb1e0b81d8bcd6698f25260ba8" FOREIGN KEY ("tagIdTag") REFERENCES public.tag("idTag") ON DELETE CASCADE;


--
-- TOC entry 2818 (class 2606 OID 16421)
-- Name: post_tags_tag FK_2252c10d4aba1b4546cb5f53a82; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "FK_2252c10d4aba1b4546cb5f53a82" FOREIGN KEY ("postIdPost") REFERENCES public.post("idPost") ON DELETE CASCADE;


--
-- TOC entry 2816 (class 2606 OID 16460)
-- Name: post FK_b19d2120615494c3f8c64dc338c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT "FK_b19d2120615494c3f8c64dc338c" FOREIGN KEY ("idUser") REFERENCES public."user"("idUser");


-- Completed on 2018-09-12 22:19:19 CEST

--
-- PostgreSQL database dump complete
--

