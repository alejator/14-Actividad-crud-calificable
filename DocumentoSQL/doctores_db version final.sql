-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2023 at 07:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `doctores_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cita`
--

CREATE TABLE `cita` (
  `Numerodocpac` int(11) NOT NULL,
  `Especialidad` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cita`
--

INSERT INTO `cita` (`Numerodocpac`, `Especialidad`) VALUES
(6739303, 'Cardiología'),
(45637897, 'Odontologia');

-- --------------------------------------------------------

--
-- Table structure for table `doctores`
--

CREATE TABLE `doctores` (
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `Especialidad` varchar(50) NOT NULL,
  `Consultorio` int(11) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctores`
--

INSERT INTO `doctores` (`Nombre`, `Apellido`, `Cedula`, `Especialidad`, `Consultorio`, `Email`) VALUES
('Laura', 'Diaz', 2222222, 'Odontologia', 456, 'l.diaz@correo.com'),
('Camila ', 'Sanchez ', 17890678, 'Cardiología', 567, 'c.sanchez@correo.com'),
('E', 'T', 53627299, 'Medicina general', 231, 'cor@cor.com');

-- --------------------------------------------------------

--
-- Table structure for table `pacientes`
--

CREATE TABLE `pacientes` (
  `Cedula` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Edad` int(11) NOT NULL,
  `Telefono` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pacientes`
--

INSERT INTO `pacientes` (`Cedula`, `Nombre`, `Apellido`, `Edad`, `Telefono`) VALUES
(6739303, 'Yuliana', 'Tovar', 67, 56372820),
(45637897, 'Paola', 'Calderon', 45, 1456756734),
(63789024, 'Ruben', 'Jimenez', 34, 78902568);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`Numerodocpac`,`Especialidad`);

--
-- Indexes for table `doctores`
--
ALTER TABLE `doctores`
  ADD PRIMARY KEY (`Cedula`);

--
-- Indexes for table `pacientes`
--
ALTER TABLE `pacientes`
  ADD PRIMARY KEY (`Cedula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
