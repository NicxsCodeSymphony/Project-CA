-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 29, 2024 at 06:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project-ca`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `time_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_updated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `fullname`, `username`, `password`, `time_created`, `time_updated`) VALUES
(1, 'John Nico Edisan', 'nicxs_assassin', 'nicxsassassin555', '2024-08-27 10:15:55', '2024-08-27 10:15:55'),
(2, 'Cyril Clyde Gullem', 'cygull', 'cyril123', '2024-08-27 10:49:27', '2024-08-27 10:49:27'),
(3, 'Lawrenz Carisusa', 'lawx', 'lawx123', '2024-08-27 12:13:34', '2024-08-27 12:13:34'),
(4, 'Dhaniel Malinao', 'bossdaniel', 'dhaniel123', '2024-08-27 13:19:36', '2024-08-27 13:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `chat_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats`
--

INSERT INTO `chats` (`chat_id`, `sender_id`, `receiver_id`, `text`, `time`) VALUES
(1, 1, 2, 'hi ouy', '2024-08-27 12:10:49'),
(2, 1, 2, 'naunsa ka?', '2024-08-27 12:17:16'),
(3, 3, 1, 'Hi brad', '2024-08-27 12:35:21'),
(4, 1, 3, 'hoy hi pud', '2024-08-27 12:39:22'),
(5, 3, 1, 'naunsa ka', '2024-08-27 13:00:11'),
(6, 3, 1, 'naunsa', '2024-08-27 13:00:13'),
(7, 3, 1, 'naunsa ka', '2024-08-27 13:00:18'),
(8, 1, 3, 'bayota', '2024-08-27 13:06:26'),
(9, 1, 3, 'wala ragud', '2024-08-27 13:19:06'),
(10, 4, 1, 'Hi boss', '2024-08-27 13:19:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`chat_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
