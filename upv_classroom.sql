-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2025 a las 05:17:53
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `upv_classroom`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos_clases`
--

CREATE TABLE `alumnos_clases` (
  `clase_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos_clases`
--

INSERT INTO `alumnos_clases` (`clase_id`, `usuario_id`) VALUES
(12, 9),
(13, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos`
--

CREATE TABLE `archivos` (
  `archivo_id` int(11) NOT NULL,
  `nombre_original` varchar(128) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `nombre_en_storage` varchar(128) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `archivos`
--

INSERT INTO `archivos` (`archivo_id`, `nombre_original`, `fecha_creacion`, `nombre_en_storage`, `usuario_id`) VALUES
(45, 'Basic SQL Concepts.pdf', '2025-10-08 09:40:42', '1759938042763-Basic SQL Concepts.pdf', 10),
(46, 'Basic SQL Concepts.pdf', '2025-10-08 09:46:15', '1759938375047-Basic SQL Concepts.pdf', 10),
(47, 'POO Fundamentos.pdf', '2025-10-15 20:04:43', '1760580283166-POO Fundamentos.pdf', 10),
(48, 'caso_03.png', '2025-10-17 09:51:53', '1760716313733-caso_03.png', 10),
(49, 'Homework.pdf', '2025-10-19 20:20:25', '1760926825245-Homework.pdf', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_publicaciones`
--

CREATE TABLE `archivos_publicaciones` (
  `archivo_id` int(11) NOT NULL,
  `publicacion_id` int(11) NOT NULL,
  `tipo_publicacion` enum('aviso','material','tarea','entrega') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `archivos_publicaciones`
--

INSERT INTO `archivos_publicaciones` (`archivo_id`, `publicacion_id`, `tipo_publicacion`) VALUES
(45, 27, 'tarea'),
(46, 36, 'material'),
(47, 44, 'aviso'),
(48, 45, 'aviso'),
(49, 12, 'entrega');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `avisos`
--

CREATE TABLE `avisos` (
  `aviso_id` int(11) NOT NULL,
  `clase_id` int(11) NOT NULL,
  `titulo_aviso` varchar(255) NOT NULL,
  `descripcion_aviso` text NOT NULL,
  `fecha_publicacion` datetime NOT NULL DEFAULT current_timestamp(),
  `has_file` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `avisos`
--

INSERT INTO `avisos` (`aviso_id`, `clase_id`, `titulo_aviso`, `descripcion_aviso`, `fecha_publicacion`, `has_file`) VALUES
(43, 12, 'Welcome to Database Fundamentals! Let\'s Get Started.', 'Hello everyone,\n\nWelcome to CMPT 250: Database Fundamentals!\n\nMy name is Jhonn Professor, and I will be your instructor for this course. I\'m excited to guide you through the essential world of databases, a core skill for any professional in the tech industry.\n\nThis course is designed to provide you with a solid foundation in database design, implementation, and management. We will move from the basic concepts of what data is and why we need databases, to designing robust data models with Entity-Relationship Diagrams (ERDs), and finally to mastering SQL to create, manipulate, and query data. Whether you plan to be a software developer, a data analyst, or a systems administrator, the skills you learn here will be invaluable.', '2025-10-08 09:27:17', 0),
(44, 13, 'Bienvenidos al curso!', 'Chicos, bienvenidos al curso de Programación Orientada a Objetos', '2025-10-15 20:04:43', 1),
(45, 13, 'Hola chiquillos', 'fskjksjfkssfs', '2025-10-17 09:51:53', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clases`
--

CREATE TABLE `clases` (
  `clase_id` int(11) NOT NULL,
  `nombre_clase` varchar(255) NOT NULL,
  `descripcion_clase` text DEFAULT NULL,
  `codigo_grupo` varchar(50) NOT NULL,
  `carrera` varchar(100) NOT NULL,
  `cuatrimestre` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clases`
--

INSERT INTO `clases` (`clase_id`, `nombre_clase`, `descripcion_clase`, `codigo_grupo`, `carrera`, `cuatrimestre`, `profesor_id`) VALUES
(12, 'Database Fundamentals', 'This course introduces students to the field of database management systems (DBMS), providing the theoretical foundations and practical skills required to design, build, manipulate, and administer databases in an efficient, secure, and scalable manner.', '4K0bykJ', 'Tecnologias de la Información', 1, 10),
(13, 'Object-Oriented Programming (OOP)', 'This course introduces students to the fundamental concepts and principles of Object-Oriented Programming (OOP), a programming paradigm centered on the use of objects and classes to design and build modular, reusable, and efficient software.', 'zz29YJl', '', 3, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entregas`
--

CREATE TABLE `entregas` (
  `entrega_id` int(11) NOT NULL,
  `tarea_id` int(11) NOT NULL,
  `alumno_id` int(11) NOT NULL,
  `fecha_entrega` datetime NOT NULL,
  `estado` enum('pendiente','entregado','calificado') NOT NULL DEFAULT 'pendiente',
  `calificacion` decimal(5,2) DEFAULT NULL,
  `has_file` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `entregas`
--

INSERT INTO `entregas` (`entrega_id`, `tarea_id`, `alumno_id`, `fecha_entrega`, `estado`, `calificacion`, `has_file`) VALUES
(11, 28, 9, '2025-10-15 20:41:28', 'entregado', 0.00, 0),
(12, 27, 9, '2025-10-19 20:20:25', 'entregado', 0.00, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `material_id` int(11) NOT NULL,
  `titulo_material` varchar(255) NOT NULL,
  `descripcion_material` text DEFAULT NULL,
  `fecha_publicacion` datetime NOT NULL DEFAULT current_timestamp(),
  `tema_id` int(11) DEFAULT NULL,
  `clase_id` int(11) NOT NULL,
  `has_file` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`material_id`, `titulo_material`, `descripcion_material`, `fecha_publicacion`, `tema_id`, `clase_id`, `has_file`) VALUES
(36, 'Introduction to SQL Commands', 'Dear students,\n\nThis week, we will begin exploring the foundations of Structured Query Language (SQL) — the language used to create, manage, and interact with databases.\n\nA new learning document has been uploaded:\n👉 “Basic SQL Concepts”\n\nThis material will help you understand how to:\n\nCreate databases and tables using appropriate data types.\n\nInsert data into tables.\n\nUse SELECT, WHERE, ORDER BY, and GROUP BY clauses.\n\nApply basic aggregate functions (COUNT, AVG, MAX, MIN, SUM).\n\nWrite simple joins between two tables.\n\nPlease read the document carefully and practice the examples using your preferred SQL environment (such as MySQL Workbench, SQLite, or PostgreSQL).\nYou will need these concepts for the upcoming Assignment 1: Introduction to SQL Queries.\n\nIf you have questions or need clarification, feel free to ask during our next class or post your doubts in the discussion forum.', '2025-10-08 09:46:15', 14, 12, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `refresh_token` varchar(255) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `fecha_generado` datetime NOT NULL,
  `fecha_caduca` datetime NOT NULL,
  `activo` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`refresh_token`, `usuario_id`, `fecha_generado`, `fecha_caduca`, `activo`) VALUES
('01JSBFJNH0N5KXC2CVNH4TPFQK', 3, '2025-04-21 00:11:43', '2025-04-22 00:11:43', 1),
('01JSBFJZ8H8QQVPA31ZVBA4N21', 1, '2025-04-21 00:11:53', '2025-04-22 00:11:53', 1),
('01JSBFNADEN61C3W98DMA83DFJ', 1, '2025-04-21 00:13:10', '2025-04-22 00:13:10', 1),
('01JSBFR73B7ZNX8AQSW7MJNTB1', 1, '2025-04-21 00:14:45', '2025-04-22 00:14:45', 1),
('01JSBGNTASWT1BBP1B0T3NC4TA', 1, '2025-04-21 00:30:55', '2025-04-22 00:30:55', 1),
('01JSBGP1TA4XVGNTXGXFDBJ009', 1, '2025-04-21 00:31:02', '2025-04-22 00:31:02', 1),
('01JSBGP2DHTP2V5TADTW0CV807', 1, '2025-04-21 00:31:03', '2025-04-22 00:31:03', 1),
('01JSBGP2MFCX0482TE1H11K741', 1, '2025-04-21 00:31:03', '2025-04-22 00:31:03', 1),
('01JSBGP2RQ5RV4PF7J6WKK9GBM', 1, '2025-04-21 00:31:03', '2025-04-22 00:31:03', 1),
('01JSBGP2ZGNXA5233XEQJKWM79', 1, '2025-04-21 00:31:03', '2025-04-22 00:31:03', 1),
('01JSBGP3EZZK720ZF02KR1TVPB', 1, '2025-04-21 00:31:04', '2025-04-22 00:31:04', 1),
('01JSBGP3N48FZKCZS149Q32FKW', 1, '2025-04-21 00:31:04', '2025-04-22 00:31:04', 1),
('01JSBGP3RTJ71WT39TGRMZHR7V', 1, '2025-04-21 00:31:04', '2025-04-22 00:31:04', 1),
('01JSBGP40HFDCKCCB5KBGFY500', 1, '2025-04-21 00:31:04', '2025-04-22 00:31:04', 1),
('01JSBGPRV5R811X50D1QKZFXVE', 1, '2025-04-21 00:31:26', '2025-04-22 00:31:26', 1),
('01JSBGPSF9JTMJZXTQK9C3AQW6', 1, '2025-04-21 00:31:26', '2025-04-22 00:31:26', 1),
('01JSBH1AC9X8VD1DT2K9DDSZCA', 1, '2025-04-21 00:37:11', '2025-04-22 00:37:11', 1),
('01JSBN9TPQ6BPH6N2X2R5BQRE7', 1, '2025-04-21 01:51:45', '2025-04-22 01:51:45', 1),
('01JSBQ01C9S5M0ZR0AMAWSVTKR', 3, '2025-04-21 02:21:21', '2025-04-22 02:21:21', 1),
('01JSBW1S0YR43NR0XY0HK30R0Z', 1, '2025-04-21 03:49:41', '2025-04-22 03:49:41', 1),
('01JSC46DNAR2XSBD36XEM5E58R', 3, '2025-04-21 06:12:02', '2025-04-22 06:12:02', 1),
('01JSC5Q91MZ7H9JWRQZMYC9XDK', 3, '2025-04-21 06:38:42', '2025-04-22 06:38:42', 1),
('01JSC5QM3MHFATDS3ETNSYM7NM', 1, '2025-04-21 06:38:54', '2025-04-22 06:38:54', 1),
('01JSC5S9VYRN9K6YSN2YT9PSB8', 1, '2025-04-21 06:39:49', '2025-04-22 06:39:49', 1),
('01JSCKEFFF8BV09BN5TF7PR2VP', 1, '2025-04-21 10:38:34', '2025-04-22 10:38:34', 1),
('01JSCKF286CHYV2SB26MNBM241', 1, '2025-04-21 10:38:53', '2025-04-22 10:38:53', 1),
('01JSCKH1WK7WZD08Z492K1TZGF', 3, '2025-04-21 10:39:59', '2025-04-22 10:39:59', 1),
('01JSDH2HYZ2ST5Q9808FYHWSCX', 1, '2025-04-21 19:16:21', '2025-04-22 19:16:21', 1),
('01JSDH9HPPCDSF82T7AJAZ9WX1', 1, '2025-04-21 19:20:10', '2025-04-22 19:20:10', 1),
('01JSDJXPYXQ48MS2WG1EY4X8E6', 1, '2025-04-21 19:48:39', '2025-04-22 19:48:39', 1),
('01JSDK38P18ZKHQX12N9MJBVK8', 1, '2025-04-21 19:51:41', '2025-04-22 19:51:41', 1),
('01JSDK3YHMVHVBSPPN1R09VNT2', 1, '2025-04-21 19:52:04', '2025-04-22 19:52:04', 1),
('01JSDK5MY65DPKZC9MYVGGSFK6', 1, '2025-04-21 19:52:59', '2025-04-22 19:52:59', 1),
('01JSDKFH2V6QF17DRGJ7V3JZEJ', 1, '2025-04-21 19:58:23', '2025-04-22 19:58:23', 1),
('01JSDKKAQR2JQW6T653VJTKMKT', 1, '2025-04-21 20:00:28', '2025-04-22 20:00:28', 1),
('01JSDKKK541F405H7QA59FPRQZ', 3, '2025-04-21 20:00:36', '2025-04-22 20:00:36', 1),
('01JSDKKMKDKCZZ5V0STN8Y9FDK', 3, '2025-04-21 20:00:38', '2025-04-22 20:00:38', 1),
('01JSDKKNHNQGVCSC1G09C0A6M2', 3, '2025-04-21 20:00:39', '2025-04-22 20:00:39', 1),
('01JSDKKXG8CRRW2CY270S9SQP6', 3, '2025-04-21 20:00:47', '2025-04-22 20:00:47', 1),
('01JSDKNWZMX31FAZJBYBP3A6BZ', 3, '2025-04-21 20:01:52', '2025-04-22 20:01:52', 1),
('01JSDKP7Y346E8NPJ614T9B7TN', 1, '2025-04-21 20:02:03', '2025-04-22 20:02:03', 1),
('01JSDM978D0M1S3NBVVAYGHPGQ', 1, '2025-04-21 20:12:25', '2025-04-22 20:12:25', 1),
('01JSDM9BCHFNYQH20D5VRPPV25', 3, '2025-04-21 20:12:29', '2025-04-22 20:12:29', 1),
('01JSDM9CB48KG9EBDFR7H6NV0E', 3, '2025-04-21 20:12:30', '2025-04-22 20:12:30', 1),
('01JSDMEWT2N0CK0XN3DQ3TFS8A', 3, '2025-04-21 20:15:31', '2025-04-22 20:15:31', 1),
('01JSDNJK2G66QREJKX6BE0NT5R', 3, '2025-04-21 20:35:01', '2025-04-22 20:35:01', 1),
('01JSDQADS974KJYY4XJEK41PRS', 1, '2025-04-21 21:05:30', '2025-04-22 21:05:30', 1),
('01JSDQC022YT40F87ZTMNFFPW7', 1, '2025-04-21 21:06:22', '2025-04-22 21:06:22', 1),
('01JSDQTPV4QZQ7YZ87NJAE0TNM', 1, '2025-04-21 21:14:24', '2025-04-22 21:14:24', 1),
('01JSDRCBXS1FCSMBB6YGP250RF', 1, '2025-04-21 21:24:02', '2025-04-22 21:24:02', 1),
('01JSDRDY4ERFE5HZSTBJDQCE0P', 1, '2025-04-21 21:24:54', '2025-04-22 21:24:54', 1),
('01JSDRFQ3V0YR8M3M1G3TZYAR9', 1, '2025-04-21 21:25:52', '2025-04-22 21:25:52', 1),
('01JSDRKK102G04VNQN5E3M2054', 1, '2025-04-21 21:27:59', '2025-04-22 21:27:59', 1),
('01JSDRSEGHG9BXWVQN9DZ212W8', 1, '2025-04-21 21:31:11', '2025-04-22 21:31:11', 1),
('01JSDSD8MNEVTMW4MP6EFZEJ7P', 1, '2025-04-21 21:42:00', '2025-04-22 21:42:00', 1),
('01JSDSE5CE9GBQFB9ZH5V8JACA', 1, '2025-04-21 21:42:30', '2025-04-22 21:42:30', 1),
('01JSDSEBW6V0ZN5Y6BJQ0ZF5HC', 1, '2025-04-21 21:42:36', '2025-04-22 21:42:36', 1),
('01JSDSG7PZN9R6J3QDXV2RFWWK', 1, '2025-04-21 21:43:38', '2025-04-22 21:43:38', 1),
('01JSDSJNYG18SF1MFHSHQCGD39', 1, '2025-04-21 21:44:58', '2025-04-22 21:44:58', 1),
('01JSDSVT4S1GJ7ZFJT5VRC6ZGM', 1, '2025-04-21 21:49:57', '2025-04-22 21:49:57', 1),
('01JSDSWCAQC8N7KHD13H7D1X42', 3, '2025-04-21 21:50:16', '2025-04-22 21:50:16', 1),
('01JSDSWT71BYXBG6FF8AQ1H5XY', 1, '2025-04-21 21:50:30', '2025-04-22 21:50:30', 1),
('01JSDW6G5QBMKTFH6ASKYH2GGH', 1, '2025-04-21 22:30:44', '2025-04-22 22:30:44', 1),
('01JSDWGA2H8QBYHM08PXCY894D', 1, '2025-04-21 22:36:06', '2025-04-22 22:36:06', 1),
('01JSDWKNJEJ4R028ZMAETMWC41', 1, '2025-04-21 22:37:56', '2025-04-22 22:37:56', 1),
('01JSDWM4DZXP6WHMFTMASC107N', 1, '2025-04-21 22:38:11', '2025-04-22 22:38:11', 1),
('01JSDWV8H97NMCY59NJ1SC5K9Q', 1, '2025-04-21 22:42:05', '2025-04-22 22:42:05', 1),
('01JSDWWNCD14VM8PDPHE2PMJV9', 1, '2025-04-21 22:42:51', '2025-04-22 22:42:51', 1),
('01JSDWYQA4KTN4N4WV5WCQGVDN', 1, '2025-04-21 22:43:58', '2025-04-22 22:43:58', 1),
('01JSDX0KR96E9VB6VQK7GS0GYP', 1, '2025-04-21 22:45:00', '2025-04-22 22:45:00', 1),
('01JSDX3G71CYCMDA1R7QE4Z1B4', 1, '2025-04-21 22:46:35', '2025-04-22 22:46:35', 1),
('01JSDXKV4XG327N0WJJ2Y7BY31', 1, '2025-04-21 22:55:30', '2025-04-22 22:55:30', 1),
('01JSDXY3E3ZGBAFEQ3MF7W0TWS', 1, '2025-04-21 23:01:06', '2025-04-22 23:01:06', 1),
('01JSDYNP7KWGCDRNBFXESB4RWV', 1, '2025-04-21 23:13:59', '2025-04-22 23:13:59', 1),
('01JSDZ5AENAVBCZDT9AZGQWZYQ', 2, '2025-04-21 23:22:32', '2025-04-22 23:22:32', 1),
('01JSE3DD9ED78BYGAF9TMPGSHS', 1, '2025-04-22 00:36:51', '2025-04-23 00:36:51', 1),
('01JSE3PT58ESGEX0XPRGW89F2X', 2, '2025-04-22 00:41:59', '2025-04-23 00:41:59', 1),
('01JSE3QDZQDHK1Q9088XS5P46E', 1, '2025-04-22 00:42:19', '2025-04-23 00:42:19', 1),
('01JSE4FJKATP70VDXD5X9N5ZNG', 3, '2025-04-22 00:55:30', '2025-04-23 00:55:30', 1),
('01JSE4G50ZSSHP2M87754HAPH0', 1, '2025-04-22 00:55:49', '2025-04-23 00:55:49', 1),
('01JSE85FBCZ9B96T41KMQANMYX', 2, '2025-04-22 01:59:54', '2025-04-23 01:59:54', 1),
('01JSE86FC8FR6S8NB5N0KEH6E0', 1, '2025-04-22 02:00:27', '2025-04-23 02:00:27', 1),
('01JSE92DT245FB45KTEWZQWHM0', 3, '2025-04-22 02:15:42', '2025-04-23 02:15:42', 1),
('01JSEA37H44GTQVNXVJPTTZZRA', 1, '2025-04-22 02:33:37', '2025-04-23 02:33:37', 1),
('01JSEA5MRXBCZ73WVKKZ9EMQF0', 1, '2025-04-22 02:34:56', '2025-04-23 02:34:56', 1),
('01JSEA61XW5B68RSBVWJCESCXV', 3, '2025-04-22 02:35:10', '2025-04-23 02:35:10', 1),
('01JSEA6J2FAFPJ0WGRNGYPCK6V', 4, '2025-04-22 02:35:26', '2025-04-23 02:35:26', 1),
('01JSEA7APDWC0M6EF99EZDX54F', 1, '2025-04-22 02:35:52', '2025-04-23 02:35:52', 1),
('01JSEA9K6K2CX62APSHCHCSE9K', 4, '2025-04-22 02:37:06', '2025-04-23 02:37:06', 1),
('01JSESYWCX233PS2ZHQ4RT5PRK', 4, '2025-04-22 07:10:52', '2025-04-23 07:10:52', 1),
('01JSET1471EYR4DM9R4B4RWNSS', 1, '2025-04-22 07:12:06', '2025-04-23 07:12:06', 1),
('01JSET4YTHDJ2KXHQQZ9QGBM7C', 4, '2025-04-22 07:14:11', '2025-04-23 07:14:11', 1),
('01JSET5JWX9NCMPHD11GVTCQ9M', 1, '2025-04-22 07:14:32', '2025-04-23 07:14:32', 1),
('01JSETFC97FPK1XJ2635FE1Z03', 3, '2025-04-22 07:19:53', '2025-04-23 07:19:53', 1),
('01JSETT99F4XBHC8ATCR45WZQX', 1, '2025-04-22 07:25:50', '2025-04-23 07:25:50', 1),
('01JSEV14PR2GFYEBE06GQNGNDZ', 3, '2025-04-22 07:29:35', '2025-04-23 07:29:35', 1),
('01JSEVA5KWRP3ZB8K3YJ3F5F1V', 1, '2025-04-22 07:34:31', '2025-04-23 07:34:31', 1),
('01JSMXGM0DH8N1HHF53RQPTR83', 1, '2025-04-24 16:08:26', '2025-04-25 16:08:26', 1),
('01JSMXJ36T044PBTGGEA2YQ7F4', 4, '2025-04-24 16:09:14', '2025-04-25 16:09:14', 1),
('01JSMXJHXQ719SSTX8EAF0XXX7', 1, '2025-04-24 16:09:29', '2025-04-25 16:09:29', 1),
('01JSMXM291YSW7Q1HJRPGNF540', 4, '2025-04-24 16:10:19', '2025-04-25 16:10:19', 1),
('01JSMXMP0Y60MJFAJFC6X1FACH', 1, '2025-04-24 16:10:39', '2025-04-25 16:10:39', 1),
('01JSMXNF61VV4FSVDXYRFN0M5W', 4, '2025-04-24 16:11:05', '2025-04-25 16:11:05', 1),
('01JSMXP84K4ZCPDXPWJQVQSM84', 1, '2025-04-24 16:11:30', '2025-04-25 16:11:30', 1),
('01JSMXQHX06ZMQD1AXYGMFYMSG', 2, '2025-04-24 16:12:13', '2025-04-25 16:12:13', 1),
('01JSMXRWW0PN9K0F3T657A63FX', 3, '2025-04-24 16:12:57', '2025-04-25 16:12:57', 1),
('01JXAVZKNY4HJKC60XXCBJRVJT', 3, '2025-06-09 11:32:03', '2025-06-10 11:32:03', 1),
('01K725FP7FP16C2QBX2RSE4M02', 10, '2025-10-08 09:01:55', '2025-10-09 09:01:55', 1),
('01K727R269M6W15F79QB9MJ9DC', 9, '2025-10-08 09:41:27', '2025-10-09 09:41:27', 1),
('01K727XPVA5SJFZEEDTYC3PT7M', 10, '2025-10-08 09:44:32', '2025-10-09 09:44:32', 1),
('01K74NN6ZPKWFFT19D3SMYD1AH', 10, '2025-10-09 08:23:02', '2025-10-10 08:23:02', 1),
('01K7791X9NQB1Q14JMAGEQDSHE', 10, '2025-10-10 08:40:30', '2025-10-11 08:40:30', 1),
('01K77JGSDH9VNX9587XNZQKDH3', 10, '2025-10-10 11:25:55', '2025-10-11 11:25:55', 1),
('01K77KSAS83Z8G34PMVTJ0K38N', 10, '2025-10-10 11:48:03', '2025-10-11 11:48:03', 1),
('01K77M9KVH8BABT4XG34HTYKSX', 10, '2025-10-10 11:56:57', '2025-10-11 11:56:57', 1),
('01K7N8T2FDCA7MNDX7FWB8KN0X', 10, '2025-10-15 19:05:35', '2025-10-16 19:05:35', 1),
('01K7NE9D9J6KY0FBXQZCQ8SY8C', 9, '2025-10-15 20:41:21', '2025-10-16 20:41:21', 1),
('01K7NEA3951G2GM3YKTMW40RGZ', 10, '2025-10-15 20:41:43', '2025-10-16 20:41:43', 1),
('01K7PKMWW2VZBJSVF44PNC7Z92', 10, '2025-10-16 07:34:14', '2025-10-17 07:34:14', 1),
('01K7PZTEASHTG8Y0XCFS2FJZ18', 10, '2025-10-16 11:06:59', '2025-10-17 11:06:59', 1),
('01K7PZYP6JMYXSNS33PYPHD6NF', 9, '2025-10-16 11:09:18', '2025-10-17 11:09:18', 1),
('01K7S9SMQFCFQKNDBPMYBJAY12', 10, '2025-10-17 08:39:47', '2025-10-18 08:39:47', 1),
('01K7SDXZVT86Q2BASKEMM3X325', 9, '2025-10-17 09:52:04', '2025-10-18 09:52:04', 1),
('01K7SF3WN1VQ2V28WF6GW0XBHW', 10, '2025-10-17 10:12:46', '2025-10-18 10:12:46', 1),
('01K7SF7JSYX3E0J43GHGEC3AP6', 9, '2025-10-17 10:14:47', '2025-10-18 10:14:47', 1),
('01K7SFA6KKDS3G6AJ3NNCTQJ9C', 9, '2025-10-17 10:16:13', '2025-10-18 10:16:13', 1),
('01K7SFD67P9E5ESGYX5AG5KT21', 9, '2025-10-17 10:17:51', '2025-10-18 10:17:51', 1),
('01K7SFEM0NS641Q95SPR07X915', 10, '2025-10-17 10:18:38', '2025-10-18 10:18:38', 1),
('01K7SFQZM7MY7W63YPNHT1BPGQ', 10, '2025-10-17 10:23:45', '2025-10-18 10:23:45', 1),
('01K7ZPKBAFNNPQQ87VK2P7AAK5', 10, '2025-10-19 20:18:59', '2025-10-20 20:18:59', 1),
('01K7ZPMQE8J38PEM7MNS4EZK2G', 9, '2025-10-19 20:19:44', '2025-10-20 20:19:44', 1),
('01K7ZPPBZYSBK74M1BWC9AZ3WG', 10, '2025-10-19 20:20:38', '2025-10-20 20:20:38', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `tarea_id` int(11) NOT NULL,
  `titulo_tarea` varchar(255) NOT NULL,
  `descripcion_tarea` text NOT NULL,
  `puntos_max` int(11) DEFAULT NULL,
  `fecha_publicacion` datetime NOT NULL,
  `fecha_limite` datetime DEFAULT NULL,
  `tema_id` int(11) DEFAULT NULL,
  `clase_id` int(11) NOT NULL,
  `has_file` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`tarea_id`, `titulo_tarea`, `descripcion_tarea`, `puntos_max`, `fecha_publicacion`, `fecha_limite`, `tema_id`, `clase_id`, `has_file`) VALUES
(27, 'Introduction to SQL Queries', 'In this assignment, you will explore the fundamentals of Structured Query Language (SQL) by creating and manipulating a simple relational database. Your task is to design a small database schema, populate it with sample data, and perform a set of basic queries to retrieve, filter, and organize information.\r\n\r\nYou should demonstrate your understanding of:\r\n\r\nCreating databases and tables using appropriate data types.\r\n\r\nInserting data into tables.\r\n\r\nUsing SELECT, WHERE, ORDER BY, and GROUP BY clauses.\r\n\r\nApplying basic aggregate functions (COUNT, AVG, MAX, MIN, SUM).\r\n\r\nWriting simple joins between two tables.\r\n\r\nDeliverables:\r\n\r\nA .sql file containing all commands used in your database creation and queries.\r\n\r\nA brief report (1 page) explaining your database structure and summarizing the results of your queries.\r\n\r\nSubmission Format:\r\nUpload both files (.sql and .pdf or .docx) to the course platform.', 100, '2025-10-08 09:40:42', '2025-10-22 23:59:00', 14, 12, 1),
(28, 'Tarea de Programación Orientada a Objetos', 'Primera tarea para programación orientada a objetos', 100, '2025-10-15 20:41:10', '2025-10-16 20:37:00', 0, 13, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `tema_id` int(11) NOT NULL,
  `nombre_tema` varchar(255) NOT NULL,
  `descripcion_tema` text DEFAULT NULL,
  `clase_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `temas`
--

INSERT INTO `temas` (`tema_id`, `nombre_tema`, `descripcion_tema`, `clase_id`) VALUES
(14, 'Unit 1: SQL', 'SQL first approach', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `matricula` varchar(64) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('profesor','alumno') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `email`, `matricula`, `nombre`, `password`, `rol`) VALUES
(9, 'studentuser@university.com', '2230545', 'Jhonn Student ', 'password123', 'alumno'),
(10, 'professoruser@university.com', NULL, 'Stephen Professor', 'password123', 'profesor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos_clases`
--
ALTER TABLE `alumnos_clases`
  ADD PRIMARY KEY (`clase_id`,`usuario_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `archivos`
--
ALTER TABLE `archivos`
  ADD PRIMARY KEY (`archivo_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `archivos_publicaciones`
--
ALTER TABLE `archivos_publicaciones`
  ADD PRIMARY KEY (`archivo_id`,`publicacion_id`,`tipo_publicacion`);

--
-- Indices de la tabla `avisos`
--
ALTER TABLE `avisos`
  ADD PRIMARY KEY (`aviso_id`),
  ADD KEY `clase_id` (`clase_id`);

--
-- Indices de la tabla `clases`
--
ALTER TABLE `clases`
  ADD PRIMARY KEY (`clase_id`),
  ADD UNIQUE KEY `codigo_grupo` (`codigo_grupo`),
  ADD KEY `profesor_id` (`profesor_id`);

--
-- Indices de la tabla `entregas`
--
ALTER TABLE `entregas`
  ADD PRIMARY KEY (`entrega_id`),
  ADD KEY `tarea_id` (`tarea_id`),
  ADD KEY `usuario_id` (`alumno_id`);

--
-- Indices de la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`material_id`),
  ADD KEY `tema_id` (`tema_id`),
  ADD KEY `clase_id` (`clase_id`);

--
-- Indices de la tabla `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`refresh_token`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`tarea_id`),
  ADD KEY `tema_id` (`tema_id`),
  ADD KEY `clase_id` (`clase_id`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD PRIMARY KEY (`tema_id`),
  ADD KEY `clase_id` (`clase_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivos`
--
ALTER TABLE `archivos`
  MODIFY `archivo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `avisos`
--
ALTER TABLE `avisos`
  MODIFY `aviso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `clase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `entregas`
--
ALTER TABLE `entregas`
  MODIFY `entrega_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `tarea_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `temas`
--
ALTER TABLE `temas`
  MODIFY `tema_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
