-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql104.infinityfree.com
-- Generation Time: May 01, 2024 at 11:34 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epiz_30852052_games`
--

-- --------------------------------------------------------

--
-- Table structure for table `casino_user`
--

CREATE TABLE `casino_user` (
  `id` int(11) NOT NULL,
  `money` int(11) NOT NULL DEFAULT 500
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `casino_user`
--

INSERT INTO `casino_user` (`id`, `money`) VALUES
(1, 500),
(2, 1150),
(3, 800),
(4, 400),
(5, 650),
(6, 119),
(7, 2700),
(8, 650),
(9, 350),
(10, 400),
(11, 800),
(12, 1000),
(13, 550),
(14, 500),
(15, 150),
(16, 500),
(17, 400);

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `path` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`id`, `title`, `path`, `description`) VALUES
(1, 'Hangman', 'hangman', ''),
(2, 'Tic Tac Toe', 'tictactoe', ''),
(4, 'Blockman PvP', 'blockman', ''),
(5, 'Coin Flip', 'coin_flip', ''),
(6, 'Game of Life', 'game_of_life', ''),
(12, 'Slot', 'slot', ''),
(13, 'Lucky Wheel', 'luckywheel', '');

-- --------------------------------------------------------

--
-- Table structure for table `game_tags`
--

CREATE TABLE `game_tags` (
  `game_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `game_tags`
--

INSERT INTO `game_tags` (`game_id`, `tag_id`) VALUES
(6, 1),
(4, 3),
(12, 1),
(5, 1),
(2, 4),
(1, 4),
(12, 5),
(13, 5),
(13, 4),
(13, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `color`) VALUES
(1, 'Javascript', 'eee170'),
(3, 'Scratch', 'f2a01c'),
(4, 'PHP', '7377ad'),
(5, 'Casino', '006300');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `casino_user`
--
ALTER TABLE `casino_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `path` (`path`);

--
-- Indexes for table `game_tags`
--
ALTER TABLE `game_tags`
  ADD KEY `game_id` (`game_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `casino_user`
--
ALTER TABLE `casino_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `game_tags`
--
ALTER TABLE `game_tags`
  ADD CONSTRAINT `game_tags_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`),
  ADD CONSTRAINT `game_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
