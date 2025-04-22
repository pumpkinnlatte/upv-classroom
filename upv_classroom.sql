-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2025 a las 15:56:50
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivos_publicaciones`
--

CREATE TABLE `archivos_publicaciones` (
  `archivo_id` int(11) NOT NULL,
  `publicacion_id` int(11) NOT NULL,
  `tipo_publicacion` enum('aviso','material','tarea','entrega') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'ClasePrueba01', 'Clase para probar insercion de clases 01', 'An56Kkze', 'Tecnologias de la Información', 4, 1),
(2, 'ClasePrueba02', 'Clase para probar insercion de clases 02', 'efgh123', 'Mecatronica', 8, 1);

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
('01JSEVA5KWRP3ZB8K3YJ3F5F1V', 1, '2025-04-22 07:34:31', '2025-04-23 07:34:31', 1);

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
(1, 'profesor01@upv.edu.mx', NULL, 'Luis Roberto', 'profesor01', 'profesor'),
(2, 'profesor02@upv.edu.mx', NULL, 'Adriana Mota', 'profesor02', 'profesor'),
(3, '2230343@upv.edu.mx', '2230343', 'Angel Ivan Cabrera Rojas', 'CABRERA298', 'alumno'),
(4, '2230404@upv.edu.mx', '2230404', 'Rodrigo Santamaria Moreno', 'gogi1234', 'alumno');

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
  MODIFY `archivo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `avisos`
--
ALTER TABLE `avisos`
  MODIFY `aviso_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `clases`
--
ALTER TABLE `clases`
  MODIFY `clase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `entregas`
--
ALTER TABLE `entregas`
  MODIFY `entrega_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `tarea_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `temas`
--
ALTER TABLE `temas`
  MODIFY `tema_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
