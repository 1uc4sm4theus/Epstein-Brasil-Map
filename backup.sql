--
-- PostgreSQL database dump
--

\restrict B6DMtWkqp0URlI5S1XjeruAupvCcOOnuBKZJOT5Gjzf3A4NJNjjxU5tT5jNlJ7t

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL,
    icon text NOT NULL,
    slug text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: location_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.location_categories (
    id integer NOT NULL,
    location_id integer NOT NULL,
    category_id integer NOT NULL
);


ALTER TABLE public.location_categories OWNER TO postgres;

--
-- Name: location_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.location_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.location_categories_id_seq OWNER TO postgres;

--
-- Name: location_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.location_categories_id_seq OWNED BY public.location_categories.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    lat double precision NOT NULL,
    lng double precision NOT NULL,
    description text NOT NULL,
    year_range text,
    image_url text
);


ALTER TABLE public.locations OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.locations_id_seq OWNER TO postgres;

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: sources; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sources (
    id integer NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    location_id integer NOT NULL
);


ALTER TABLE public.sources OWNER TO postgres;

--
-- Name: sources_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sources_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sources_id_seq OWNER TO postgres;

--
-- Name: sources_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sources_id_seq OWNED BY public.sources.id;


--
-- Name: timeline_events; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.timeline_events (
    id integer NOT NULL,
    year integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    location_id integer,
    type text DEFAULT 'event'::text,
    external_link text,
    short_id text
);


ALTER TABLE public.timeline_events OWNER TO postgres;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.timeline_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.timeline_events_id_seq OWNER TO postgres;

--
-- Name: timeline_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.timeline_events_id_seq OWNED BY public.timeline_events.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: location_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_categories ALTER COLUMN id SET DEFAULT nextval('public.location_categories_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: sources id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sources ALTER COLUMN id SET DEFAULT nextval('public.sources_id_seq'::regclass);


--
-- Name: timeline_events id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timeline_events ALTER COLUMN id SET DEFAULT nextval('public.timeline_events_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, icon, slug) FROM stdin;
1	Recrutamento	👥	recrutamento
2	Financeiro	💰	financeiro
3	Scouting	🔭	scouting
4	Turismo Sexual	✈️	sex-tourism
5	Base Operacional	🏢	base
\.


--
-- Data for Name: location_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.location_categories (id, location_id, category_id) FROM stdin;
1	1	1
2	1	3
3	2	5
4	2	1
5	3	1
6	3	2
7	4	2
8	4	5
9	5	4
10	5	1
11	6	1
12	7	5
13	7	3
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.locations (id, name, type, lat, lng, description, year_range, image_url) FROM stdin;
2	Fortaleza (CE)	Capital / Grande cidade	-3.73	-38.527	Destino frequente de Brunel (chegadas noturnas, e-mails de 2013). Base para visitas a praias próximas.	2010-2016	https://source.unsplash.com/800x600/?Fortaleza%20(CE),city
3	Natal (RN)	Capital / Cidade média	-5.794	-35.211	E-mails de 2011 mencionam jovem pobre da periferia. Intermediária apresenta garota a Epstein.	2011	https://source.unsplash.com/800x600/?Natal%20(RN),city
4	São Paulo (SP)	Metrópole	-23.55	-46.633	Epstein menciona viagens a SP (e-mails 2006-2008). Compra de apartamento na Vila Olímpia (2003).	2003-2008+	https://source.unsplash.com/800x600/?S%C3%A3o%20Paulo%20(SP),city
5	Rio de Janeiro (RJ)	Capital / Metrópole	-22.906	-43.172	Visitas de Brunel. Citado em arquivos JPMorgan como exemplo de turismo sexual.	2006-2019	https://source.unsplash.com/800x600/?Rio%20de%20Janeiro%20(RJ),city
6	Belo Horizonte (MG)	Capital	-19.916	-43.935	Brunel passou pela cidade em expedições de scouting (2012-2016).	2012-2016	https://source.unsplash.com/800x600/?Belo%20Horizonte%20(MG),city
7	Santa Catarina (Balneário Camboriú)	Área turística de luxo	-27	-48.5	Celular de Brunel rastreado no Infinity Blue Resort & Spa. Maxwell também na região (2019).	2019	https://source.unsplash.com/800x600/?Santa%20Catarina%20(Balne%C3%A1rio%20Cambori%C3%BA),city
8	Vitória(ES)	Capital	-20.319	-40.338	Em 2011-2013, Brunel esteve em Vitória e outras capitais brasileiras (como Fortaleza, Rio de Janeiro, Belo Horizonte e Porto Alegre) para recrutar garotas com o "perfil desejado" por Epstein. Ele enviava e-mails com fotos de jovens, descrevendo-as como potenciais "modelos" para a rede. Uma reportagem do jornal O Estado de S. Paulo (2026) cita arquivos onde Brunel relata tentativas de recrutamento no ES, incluindo contatos com agências locais de modelagem.	2011-2013	https://upload.wikimedia.org/wikipedia/commons/2/27/-2016-11-05_ao_13-_Vit%C3%B3ria_94_Romerito_Pontes_%2830875449812%29_%28cropped%29.jpg
1	Aracati (CE) / Canoa Quebrada	Pequena / Praia turística	-4.528	-37.734	Brunel enviou fotos de Canoa Quebrada para Epstein (e-mails 2011). Menções a praias isoladas para scouting.	2010-2016	https://www.viagenscinematograficas.com.br/wp-content/uploads/2022/12/Canoa-Quebrada-Morro-Branco-Ceara-2.jpg\n
\.


--
-- Data for Name: sources; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sources (id, title, url, location_id) FROM stdin;
1	Jean-Luc Brunel Connection	#	1
2	E-mails com fotos 'Aracati-20111121'	#	1
3	Arquivos DOJ	#	2
4	MPF Investigation	#	3
5	InfoMoney Report	#	4
6	The Guardian	#	5
7	Agência Pública	#	6
8	Sky News	#	7
\.


--
-- Data for Name: timeline_events; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.timeline_events (id, year, title, description, location_id, type, external_link, short_id) FROM stdin;
1	2003	Apartamento em SP	Epstein compra imóvel na Vila Olímpia, São Paulo.	\N	event	\N	\N
2	2006	Início das Viagens	Primeiros registros frequentes de e-mails sobre viagens ao Brasil.	\N	event	\N	\N
3	2011	Canoa Quebrada	Fotos enviadas por Brunel a Epstein focando em praias do Ceará.	\N	event	\N	\N
4	2019	Fuga e Rastreamento	Jean-Luc Brunel rastreado em resort de luxo em Santa Catarina pouco antes de sua prisão.	\N	event	\N	\N
5	2026	MPF Investigação	Ministério Público Federal abre novo inquérito baseado em novos arquivos liberados.	\N	event	\N	\N
6	2026	Pista Anônima: BR-EP-CYDAFN	Conexão Brunel com o rio grande do Sul	\N	lead	https://www.bbc.com/portuguese/articles/c5y6g6yzev5o	BR-EP-CYDAFN
7	2026	Pista Anônima: BR-EP-UNCMBA	Epstein - Rio Grande do Sul: Conexão via Brunel	\N	lead	www.bbc.com	BR-EP-UNCMBA
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 5, true);


--
-- Name: location_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.location_categories_id_seq', 13, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.locations_id_seq', 7, true);


--
-- Name: sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sources_id_seq', 8, true);


--
-- Name: timeline_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.timeline_events_id_seq', 7, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: categories categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_unique UNIQUE (slug);


--
-- Name: location_categories location_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_categories
    ADD CONSTRAINT location_categories_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: sources sources_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sources
    ADD CONSTRAINT sources_pkey PRIMARY KEY (id);


--
-- Name: timeline_events timeline_events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timeline_events
    ADD CONSTRAINT timeline_events_pkey PRIMARY KEY (id);


--
-- Name: location_categories location_categories_category_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_categories
    ADD CONSTRAINT location_categories_category_id_categories_id_fk FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: location_categories location_categories_location_id_locations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.location_categories
    ADD CONSTRAINT location_categories_location_id_locations_id_fk FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: sources sources_location_id_locations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sources
    ADD CONSTRAINT sources_location_id_locations_id_fk FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- Name: timeline_events timeline_events_location_id_locations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.timeline_events
    ADD CONSTRAINT timeline_events_location_id_locations_id_fk FOREIGN KEY (location_id) REFERENCES public.locations(id);


--
-- PostgreSQL database dump complete
--

\unrestrict B6DMtWkqp0URlI5S1XjeruAupvCcOOnuBKZJOT5Gjzf3A4NJNjjxU5tT5jNlJ7t

