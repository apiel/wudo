--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)
-- Dumped by pg_dump version 10.5 (Ubuntu 10.5-1.pgdg18.04+1)

-- Started on 2018-09-12 22:20:43 CEST

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
-- TOC entry 2940 (class 0 OID 16384)
-- Dependencies: 196
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.post VALUES ('hello world', '2018-09-11 21:08:42.009813', 1, 1);
INSERT INTO public.post VALUES ('this a link
', '2018-09-11 21:09:30.428162', 2, 1);


--
-- TOC entry 2942 (class 0 OID 16395)
-- Dependencies: 198
-- Data for Name: post_tags_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.post_tags_tag VALUES (1, 1);
INSERT INTO public.post_tags_tag VALUES (1, 2);
INSERT INTO public.post_tags_tag VALUES (2, 1);


--
-- TOC entry 2943 (class 0 OID 16398)
-- Dependencies: 199
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tag VALUES (1, 'test', '2018-09-10 21:28:47.67168');
INSERT INTO public.tag VALUES (2, 'javascript', '2018-09-10 21:29:28.521695');


--
-- TOC entry 2945 (class 0 OID 16436)
-- Dependencies: 201
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" VALUES (1, 'Alexandre Piel', 'alexandre.piel@gmail.com', '2018-09-12 21:23:14.815625', NULL, NULL);


--
-- TOC entry 2956 (class 0 OID 0)
-- Dependencies: 197
-- Name: post_idPost_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."post_idPost_seq"', 1, false);


--
-- TOC entry 2957 (class 0 OID 0)
-- Dependencies: 200
-- Name: tag_idTag_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tag_idTag_seq"', 1, false);


--
-- TOC entry 2958 (class 0 OID 0)
-- Dependencies: 202
-- Name: user_idUser_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."user_idUser_seq"', 1, true);


-- Completed on 2018-09-12 22:20:44 CEST

--
-- PostgreSQL database dump complete
--

