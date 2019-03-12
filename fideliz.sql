-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 12 mars 2019 à 20:49
-- Version du serveur :  5.7.17
-- Version de PHP :  5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `fideliz`
--

-- --------------------------------------------------------

--
-- Structure de la table `accsociete`
--

CREATE TABLE `accsociete` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `confirmation` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `nomsociete` varchar(100) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `typecompte` int(11) NOT NULL,
  `nbclient` int(11) NOT NULL,
  `limitclient` int(11) NOT NULL,
  `nbpointage` int(11) NOT NULL,
  `limitpointage` int(11) NOT NULL,
  `debutabo` date NOT NULL,
  `finabo` date NOT NULL,
  `jrestant` int(11) NOT NULL,
  `imgfond` varchar(255) NOT NULL,
  `imgicon` varchar(255) NOT NULL,
  `apikey` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `accsociete`
--

INSERT INTO `accsociete` (`id`, `email`, `password`, `confirmation`, `nom`, `prenom`, `adresse`, `nomsociete`, `telephone`, `typecompte`, `nbclient`, `limitclient`, `nbpointage`, `limitpointage`, `debutabo`, `finabo`, `jrestant`, `imgfond`, `imgicon`, `apikey`) VALUES
(1, 'ludovic.lvnr@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, 'PAYET', 'Eddy', '56 chemin des fleurs 97400', 'EddyCoiffure', '0692101112', 1, 0, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 'backgroundCarte.jpg', 'logocarte.png', 'e6c14066a83d3416238afbc40a9f437a'),
(2, 'fideliz@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, 'LEVENEUR', 'Ludovic', '56 chemin des fleurs 97400', 'Fideliz', '0692113344', 2, 0, 10, 40, 15, '2019-02-18', '2019-03-20', 9, 'carddefault.jpg', 'logodefault.png', 'b3470a6aba7953782f54486b8cc28d02'),
(3, 'blizzard@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, '', '', '', 'Blizzard', '', 2, 0, 10, 0, 15, '0000-00-00', '0000-00-00', 0, 'null', 'null', 'fedd6393d9b9224fcba3c3ce0ba33b96'),
(4, 'brawl@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, '', '', '', 'BrawlStudio', '', 1, 0, 10, 0, 15, '2019-02-09', '2019-03-11', 28, 'null', 'null', 'e3fe6a42aaf6a6f49760186c481afad6'),
(5, 'cathy@gmail.com', 'af56310c080ab9d9f3d96be9f16edebf', 1, '', '', '', 'MenageParty', '', 1, 0, 10, 1, 15, '2019-02-10', '2019-03-12', 30, 'BCGC144501D09-02-2019.jpg', 'LOGO517944D09-02-2019.png', '2dd7b6dff53be1b24f1d9b967071778d'),
(6, 'dbz@gmail.com', '9512406d8e0fdb1542ac665e39461f96', 1, 'LEVENEUR', 'Ludovic', '56 Bis Chemin du ruisseau', 'DragonBallZ', '0692102030', 0, 0, 10, 0, 15, '0000-00-00', '0000-00-00', 0, 'carddefault.jpg', 'logodefault.png', 'd31468015e450290d6698d91ec099b96'),
(7, 'loniweb@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, 'Loni', 'Cedric', '56 chemin des oiseaux', 'Loniweb', '0692101213', 1, 0, 10, 1, 15, '2019-02-18', '2019-03-20', 30, 'BCGC713623D18-02-2019.jpg', 'logodefault.png', 'b5a0265cdaa6c4b952c3791c9b5dbca8');

-- --------------------------------------------------------

--
-- Structure de la table `acctclient`
--

CREATE TABLE `acctclient` (
  `id` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `idsouche` int(11) NOT NULL,
  `dinscription` date NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `telephone` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(150) NOT NULL,
  `nbcartetotal` int(11) NOT NULL,
  `nbcarteterminer` int(11) NOT NULL,
  `nbpointagetotal` int(11) NOT NULL,
  `pointboutique` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `acctclient`
--

INSERT INTO `acctclient` (`id`, `identreprise`, `idsouche`, `dinscription`, `nom`, `prenom`, `adresse`, `telephone`, `email`, `password`, `nbcartetotal`, `nbcarteterminer`, `nbpointagetotal`, `pointboutique`) VALUES
(1, 2, 0, '2018-11-15', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louis', '0692729322', 'ludovic.lvnr@gmail.com', 'adf5fddd3058d38759d3f3859ecc695a', 0, 0, 0, 0),
(2, 2, 0, '2018-11-15', 'LEVENEURa', 'Ludovica', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louisaz', '069272932233', 'ludovic.lvnr@gmail.coma', 'adf5fddd3058d38759d3f3859ecc695azz87', 0, 0, 0, 0),
(3, 2, 0, '2018-11-15', 'LEVENEURazeaze', 'Ludovicaazeae', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louisaz4552741', '06927293223399', 'ludovic.lvnr@gmail.comaqsdq', 'adf5fddd3058d38759d3f3859ecc695azz87qsd', 0, 0, 0, 0),
(4, 2, 0, '2019-01-04', 'RiviÃ¨re', 'Max', '56Bis', '0692659877', 'max@gmail.com', 'edff293d77fa6f0e2ccdfefe35ea2d84', 0, 1, 0, 0),
(5, 2, 0, '2019-01-04', 'RiviÃ¨re', 'Max', '56 Rue des encombrants 97421 La riviÃ¨re Saint-Louis', '0692741255', 'max@gmail.com', 'edff293d77fa6f0e2ccdfefe35ea2d84', 0, 3, 0, 0),
(6, 2, 0, '2019-01-04', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau', '0692102030', 'dbz@gmail.com', 'fac72322259f2d9ead77a4de15457582', 0, 0, 0, 0),
(7, 2, 0, '2019-01-04', 'Titi', 'toto', '30 rue des titis', '0692101112', 'max@gmail.com', '503e3e3e9c7cfc2fff762adac089d2ea', 0, 0, 0, 0),
(8, 2, 0, '2019-01-08', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 12, 37, 12),
(15, 1, 8, '2019-01-28', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 12),
(16, 3, 8, '2019-01-31', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 12),
(17, 5, 8, '2019-02-09', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 1, 1, 12),
(18, 5, 0, '2019-02-10', 'Test', 'Totoboc', '56 Chemin des tests', '0692101112', 'totoboc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 0),
(19, 5, 0, '2019-02-10', 'Lili', 'Boco', '56 chemin des liloboco', '0692222324', 'liliboco@gmail.com', 'a8c5587bf4dc90f79e065df3af8ebaa7', 0, 0, 0, 0),
(20, 7, 0, '2019-02-18', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau', '0692729322', 'ludovic@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 1, 1, 0),
(21, 2, 20, '2019-02-18', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau', '0692729322', 'ludovic@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `cadeaux`
--

CREATE TABLE `cadeaux` (
  `id` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `idprestation` int(11) NOT NULL,
  `prestation` varchar(255) NOT NULL,
  `prix` float NOT NULL,
  `activation` int(11) NOT NULL,
  `prdtgrp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cadeaux`
--

INSERT INTO `cadeaux` (`id`, `identreprise`, `idprestation`, `prestation`, `prix`, `activation`, `prdtgrp`) VALUES
(1, 2, 0, 'Brushing', 50.55, 1, 0),
(2, 2, 0, 'Shampooing', 10, 1, 0),
(3, 2, 0, 'Coupe homme', 100, 1, 1),
(8, 2, 0, 'Margarita', 60, 1, 1),
(9, 5, 0, 'Brushing', 20, 1, 0),
(10, 7, 0, 'Brushing', 20, 1, 0),
(11, 7, 0, 'Couleur', 50, 1, 0),
(12, 2, 1, 'TestUn', 90, 1, 0),
(13, 2, 0, 'Hola', 100, 1, 0),
(14, 2, 0, 'Checkbam', 150, 1, 0),
(15, 2, 0, 'Tchuk', 20.2, 1, 0),
(16, 2, 0, 'Blam', 10.88, 1, 0),
(17, 2, 0, 'Testo', 5.55, 1, 0),
(26, 2, 3, 'ProduitDeux', 20, 1, 0),
(27, 2, 3, 'ProduitQuatre', 40, 1, 0),
(28, 2, 3, 'ProduitTrois', 30, 1, 0),
(29, 2, 3, 'ProduitUn', 10, 1, 0),
(30, 2, 8, 'TDeux', 10, 1, 0),
(31, 2, 8, 'TUn', 5, 1, 0),
(32, 2, 8, 'TQuatre', 30, 1, 0),
(33, 2, 8, 'TTrois', 15, 1, 0);

-- --------------------------------------------------------

--
-- Structure de la table `cartefidelite`
--

CREATE TABLE `cartefidelite` (
  `id` int(11) NOT NULL,
  `idclient` int(11) NOT NULL,
  `datecreation` date NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `nbpointage` int(11) NOT NULL,
  `limitpointage` int(11) NOT NULL,
  `statut` int(11) NOT NULL,
  `cadeaux` text NOT NULL,
  `imgbackground` varchar(255) NOT NULL,
  `imgicon` varchar(255) NOT NULL,
  `qrcode` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cartefidelite`
--

INSERT INTO `cartefidelite` (`id`, `idclient`, `datecreation`, `nom`, `prenom`, `nbpointage`, `limitpointage`, `statut`, `cadeaux`, `imgbackground`, `imgicon`, `qrcode`) VALUES
(1, 1, '2019-01-07', 'LEVENEUR', 'Ludovic', 0, 15, 1, '1 shampooing', 'backgroundCarte.jpg', 'logocarte.png', '366251495'),
(2, 8, '2019-01-08', 'Riviere', 'JeanMarc', 15, 15, 2, '1 coupe gratuite', 'backgroundCarte.jpg', 'logocarte.png', '589602382'),
(3, 8, '2019-01-09', 'Riviere', 'JeanMarc', 10, 10, 2, '1 shampooing', 'backgroundCarte.jpg', 'logocarte.png', '852587963'),
(4, 8, '2019-01-09', 'Riviere', 'JeanMarc', 10, 10, 2, '1 Brushing', 'backgroundCarte.jpg', 'logocarte.png', '945331638'),
(5, 8, '2019-01-11', 'Riviere', 'JeanMarc', 10, 10, 2, '1 coupe gratuite', 'backgroundCarte.jpg', 'logocarte.png', '57868888'),
(6, 8, '2019-01-11', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 50.55 â‚¬', 'backgroundCarte.jpg', 'logocarte.png', '223241456'),
(7, 8, '2019-01-21', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 50.55 â‚¬', 'BCGC902130D24-01-2019.png', 'LOGO443298D24-01-2019.png', '289122476'),
(8, 7, '2019-02-04', 'Titi', 'toto', 0, 10, 2, 'Brushing - 50.55 â‚¬', 'BCGC902130D24-01-2019.png', 'LOGO443298D24-01-2019.png', '125669880'),
(9, 17, '2019-02-09', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 20 â‚¬', 'undefined', 'undefined', '479918552'),
(10, 17, '2019-02-09', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 20 â‚¬', 'undefined', 'undefined', ''),
(11, 17, '2019-02-09', 'Riviere', 'JeanMarc', 0, 10, 1, 'Brushing - 20 â‚¬', 'BCGC144501D09-02-2019.jpg', 'LOGO517944D09-02-2019.png', ''),
(12, 20, '2019-02-18', 'LEVENEUR', 'Ludovic', 10, 10, 2, 'Couleur - 50 â‚¬', 'carddefault.jpg', 'logodefault.png', '13390946'),
(13, 20, '2019-02-18', 'LEVENEUR', 'Ludovic', 0, 10, 1, 'Brushing - 20 â‚¬', 'carddefault.jpg', 'logodefault.png', ''),
(14, 8, '2019-03-07', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 50.55 â‚¬', 'carddefault.jpg', 'logodefault.png', '988171050'),
(15, 8, '2019-03-08', 'Riviere', 'JeanMarc', 3, 10, 1, 'Brushing - 50.55 â‚¬', 'carddefault.jpg', 'logodefault.png', '666394429');

-- --------------------------------------------------------

--
-- Structure de la table `fidcadeaux`
--

CREATE TABLE `fidcadeaux` (
  `id` int(11) NOT NULL,
  `idclient` int(11) NOT NULL,
  `idcarte` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `cadeaux` varchar(255) NOT NULL,
  `statut` int(11) NOT NULL,
  `datereceptioncadeaux` datetime NOT NULL,
  `code` int(11) NOT NULL,
  `prix` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `fidcadeaux`
--

INSERT INTO `fidcadeaux` (`id`, `idclient`, `idcarte`, `date`, `cadeaux`, `statut`, `datereceptioncadeaux`, `code`, `prix`) VALUES
(1, 8, 7, '2019-01-09 14:21:07', '1 Brushing', 2, '2019-01-10 11:46:11', 945331638, 2000),
(2, 8, 7, '2019-01-09 14:22:07', '1 Brushing', 2, '2019-01-10 11:46:18', 945331669, 105.9),
(3, 8, 7, '2019-01-11 09:02:02', '1 coupe gratuite', 2, '2019-01-11 09:02:23', 57868888, 52.85),
(4, 8, 7, '2019-01-11 11:15:54', 'Brushing', 2, '2019-01-11 11:18:51', 223241456, 50.55),
(5, 17, 9, '2019-02-09 14:07:14', 'Brushing', 2, '2019-02-09 14:08:00', 479918552, 20),
(6, 20, 12, '2019-02-18 12:46:38', 'Couleur', 2, '2019-02-18 12:48:36', 13390946, 50),
(7, 8, 7, '2019-02-22 07:04:02', 'Brushing', 2, '2019-02-22 07:06:10', 183861545, 50.55),
(8, 8, 7, '2019-02-22 07:17:55', 'Brushing', 2, '2019-02-22 07:18:47', 289122476, 50.55),
(9, 8, 14, '2019-03-08 09:55:19', 'Brushing', 1, '2019-03-08 09:55:19', 988171050, 50.55);

-- --------------------------------------------------------

--
-- Structure de la table `parametres`
--

CREATE TABLE `parametres` (
  `id` int(11) NOT NULL,
  `maintenance` int(11) NOT NULL,
  `version` varchar(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `parametres`
--

INSERT INTO `parametres` (`id`, `maintenance`, `version`) VALUES
(1, 0, '1.0.1.5');

-- --------------------------------------------------------

--
-- Structure de la table `planning`
--

CREATE TABLE `planning` (
  `id` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `idclient` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` varchar(255) NOT NULL,
  `end` varchar(255) NOT NULL,
  `departheure` varchar(8) NOT NULL,
  `finheure` varchar(8) NOT NULL,
  `statut` int(11) NOT NULL,
  `reelstart` varchar(255) NOT NULL,
  `reelend` varchar(255) NOT NULL,
  `idproposant` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `planning`
--

INSERT INTO `planning` (`id`, `identreprise`, `idclient`, `title`, `start`, `end`, `departheure`, `finheure`, `statut`, `reelstart`, `reelend`, `idproposant`) VALUES
(37, 2, 8, 'Coupe avec Eddy', '07/03/2019', '07/03/2019', '18:00:00', '19:00:00', 2, 'Thu, 07 Mar 2019 14:00:00 GMT', 'Thu, 07 Mar 2019 15:00:00 GMT', 8),
(36, 2, 8, 'TchockQuatre', '04/03/2019', '04/03/2019', '14:00:00', '15:00:00', 2, 'Mon, 04 Mar 2019 10:00:00 GMT', 'Mon, 04 Mar 2019 11:00:00 GMT', 8),
(35, 2, 8, 'TchockTrois', '04/03/2019', '04/03/2019', '13:00:00', '14:00:00', 1, 'Mon, 04 Mar 2019 09:00:00 GMT', 'Mon, 04 Mar 2019 10:00:00 GMT', 8),
(34, 2, 8, 'TchockDeux', '04/03/2019', '04/03/2019', '12:00:00', '13:00:00', 1, 'Mon, 04 Mar 2019 08:00:00 GMT', 'Mon, 04 Mar 2019 09:00:00 GMT', 8),
(33, 2, 8, 'Tchock', '04/03/2019', '04/03/2019', '11:00:00', '12:00:00', 1, 'Mon, 04 Mar 2019 07:00:00 GMT', 'Mon, 04 Mar 2019 08:00:00 GMT', 8),
(45, 2, 8, 'TestRDVClient', '07/03/2019', '07/03/2019', '09:45:00', '10:45:00', 2, 'Thu, 07 Mar 2019 05:45:00 GMT', 'Thu, 07 Mar 2019 06:45:00 GMT', 8),
(42, 2, 8, 'zfzfzefe', '04/03/2019', '04/03/2019', '15:15:00', '16:15:00', 2, 'Mon, 04 Mar 2019 11:15:00 GMT', 'Mon, 04 Mar 2019 12:15:00 GMT', 2),
(49, 2, 8, 'MonRDV', '08/03/2019', '08/03/2019', '08:00:00', '09:00:00', 2, 'Fri, 08 Mar 2019 04:00:00 GMT', 'Fri, 08 Mar 2019 05:00:00 GMT', 2),
(48, 2, 8, 'HolaJeCheckEncore', '07/03/2019', '07/03/2019', '12:00:00', '13:00:00', 2, 'Thu, 07 Mar 2019 08:00:00 GMT', 'Thu, 07 Mar 2019 09:00:00 GMT', 8),
(50, 2, 8, 'JeVERDV', '09/03/2019', '09/03/2019', '07:45:00', '08:45:00', 2, 'Sat, 09 Mar 2019 03:45:00 GMT', 'Sat, 09 Mar 2019 04:45:00 GMT', 8),
(54, 2, 7, 'Tchiakaa', '06/03/2019', '06/03/2019', '08:00:00', '09:00:00', 1, 'Wed, 06 Mar 2019 04:00:00 GMT', 'Wed, 06 Mar 2019 05:00:00 GMT', 2),
(53, 2, 21, 'TestAutreClient', '05/03/2019', '05/03/2019', '06:00:00', '07:00:00', 2, 'Tue, 05 Mar 2019 02:00:00 GMT', 'Tue, 05 Mar 2019 03:00:00 GMT', 2),
(55, 2, 7, 'Tchoukou', '06/03/2019', '06/03/2019', '14:00:00', '15:00:00', 1, 'Wed, 06 Mar 2019 10:00:00 GMT', 'Wed, 06 Mar 2019 11:00:00 GMT', 2),
(56, 2, 7, 'Pouloukou', '06/03/2019', '06/03/2019', '16:00:00', '17:00:00', 1, 'Wed, 06 Mar 2019 12:00:00 GMT', 'Wed, 06 Mar 2019 13:00:00 GMT', 2),
(61, 2, 8, 'qsdqsdqsd', '07/03/2019', '07/03/2019', '13:00:00', '14:00:00', 1, 'Thu, 07 Mar 2019 09:00:00 GMT', 'Thu, 07 Mar 2019 10:00:00 GMT', 8),
(62, 2, 8, 'Ludovic LEVENEUR', '07/03/2019', '07/03/2019', '14:00:00', '15:00:00', 1, 'Thu, 07 Mar 2019 10:00:00 GMT', 'Thu, 07 Mar 2019 11:00:00 GMT', 8),
(64, 2, 8, 'qsdqsdqsd', '07/03/2019', '07/03/2019', '08:00:00', '09:00:00', 1, 'Thu, 07 Mar 2019 04:00:00 GMT', 'Thu, 07 Mar 2019 05:00:00 GMT', 8),
(66, 2, 8, '974', '08/03/2019', '08/03/2019', '12:00:00', '13:00:00', 2, 'Fri, 08 Mar 2019 08:00:00 GMT', 'Fri, 08 Mar 2019 09:00:00 GMT', 2);

-- --------------------------------------------------------

--
-- Structure de la table `pointage`
--

CREATE TABLE `pointage` (
  `id` int(11) NOT NULL,
  `idcarte` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `idclient` int(11) NOT NULL,
  `entreprise` varchar(255) NOT NULL,
  `departpointage` datetime NOT NULL,
  `client` varchar(255) NOT NULL,
  `finpointage` datetime NOT NULL,
  `statut` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `prestation` varchar(255) NOT NULL,
  `prix` float NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pointage`
--

INSERT INTO `pointage` (`id`, `idcarte`, `identreprise`, `idclient`, `entreprise`, `departpointage`, `client`, `finpointage`, `statut`, `code`, `prestation`, `prix`) VALUES
(4, 0, 2, 8, 'Fideliz', '2019-01-08 13:46:01', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '978418961', '', 10),
(2, 0, 2, 1, 'Fideliz', '2019-01-07 12:28:54', 'LEVENEUR Ludovic', '0000-00-00 00:00:00', 2, '366251495', '', 20),
(5, 0, 2, 8, 'Fideliz', '2019-01-08 15:36:36', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '92331003', '', 30),
(6, 0, 2, 8, 'Fideliz', '2019-01-08 15:49:13', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '25956811', '', 40),
(7, 0, 2, 8, 'Fideliz', '2019-01-08 15:51:22', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '237085029', '', 50),
(8, 0, 2, 8, 'Fideliz', '2019-01-09 09:39:02', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '744348816', '', 5),
(9, 0, 2, 8, 'Fideliz', '2019-01-09 09:42:01', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '246464082', '', 55),
(10, 0, 2, 8, 'Fideliz', '2019-01-09 10:43:37', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '367646830', '', 60),
(11, 0, 2, 8, 'Fideliz', '2019-01-09 10:45:15', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '589602382', '', 65),
(12, 0, 2, 8, 'Fideliz', '2019-01-09 11:13:06', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '596496091', '', 70),
(13, 0, 2, 8, 'Fideliz', '2019-01-09 11:16:25', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '123167839', '', 75),
(14, 0, 2, 8, 'Fideliz', '2019-01-09 11:17:24', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '287433527', '', 80),
(15, 0, 2, 8, 'Fideliz', '2019-01-09 11:19:17', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '78623756', '', 85),
(16, 0, 2, 8, 'Fideliz', '2019-01-09 11:21:09', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '852587963', '', 90),
(17, 0, 2, 8, 'Fideliz', '2019-01-09 11:40:16', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '773151896', '', 95),
(18, 0, 2, 8, 'Fideliz', '2019-01-21 21:31:58', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '974264699', '', 100),
(19, 0, 2, 8, 'Fideliz', '2019-01-21 21:54:50', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '76786324', '', 105),
(20, 0, 2, 8, 'Fideliz', '2019-01-21 21:55:59', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '513106325', '', 110),
(21, 0, 2, 17, 'MenageParty', '2019-02-09 14:01:54', 'Riviere JeanMarc', '2019-02-09 14:02:29', 2, '503129946', '', 115),
(22, 0, 2, 7, 'Fideliz', '2019-02-12 05:55:15', 'Titi toto', '2019-02-12 05:55:15', 2, '125669880', '', 120),
(23, 0, 2, 8, 'Fideliz', '2019-02-13 06:19:54', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '529139809', 'Brushing', 50.55),
(24, 0, 2, 8, 'Fideliz', '2019-02-13 08:04:52', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '553885927', 'Brushing', 50.55),
(25, 0, 2, 8, 'Fideliz', '2019-02-13 08:09:22', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '713625711', 'Brushing', 50.55),
(26, 0, 2, 8, 'Fideliz', '2019-02-13 08:11:40', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '959335893', 'Shampooing', 10),
(27, 0, 2, 8, 'Fideliz', '2019-02-13 08:17:12', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '199198164', 'Brushing', 50.55),
(28, 0, 2, 8, 'Fideliz', '2019-02-13 08:18:24', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '928487650', 'Margarita', 15),
(29, 7, 2, 8, 'Fideliz', '2019-02-13 09:41:55', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '63219564', 'Brushing', 50.55),
(30, 7, 2, 8, 'Fideliz', '2019-02-13 09:56:52', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '39438359', 'Brushing', 50.55),
(31, 7, 2, 8, 'Fideliz', '2019-02-13 11:28:13', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '717892863', 'Shampooing', 10),
(32, 12, 7, 20, 'Loniweb', '2019-02-18 12:41:06', 'LEVENEUR Ludovic', '2019-02-18 12:41:57', 2, '201561255', 'Couleur', 50),
(33, 0, 2, 8, 'Fideliz', '2019-01-08 13:46:01', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '978418961', '', 10),
(34, 0, 2, 1, 'Fideliz', '2019-01-07 12:28:54', 'LEVENEUR Ludovic', '0000-00-00 00:00:00', 2, '366251495', '', 20),
(35, 0, 2, 8, 'Fideliz', '2019-01-08 15:36:36', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '92331003', '', 30),
(36, 0, 2, 8, 'Fideliz', '2019-01-08 15:49:13', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '25956811', '', 40),
(37, 0, 2, 8, 'Fideliz', '2019-01-08 15:51:22', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '237085029', '', 50),
(38, 0, 2, 8, 'Fideliz', '2019-01-09 09:39:02', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '744348816', '', 5),
(39, 0, 2, 8, 'Fideliz', '2019-01-09 09:42:01', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '246464082', '', 55),
(40, 0, 2, 8, 'Fideliz', '2019-01-09 10:43:37', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '367646830', '', 60),
(41, 0, 2, 8, 'Fideliz', '2019-01-09 10:45:15', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '589602382', '', 65),
(42, 0, 2, 8, 'Fideliz', '2019-01-09 11:13:06', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '596496091', '', 70),
(43, 0, 2, 8, 'Fideliz', '2019-01-09 11:16:25', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '123167839', '', 75),
(44, 0, 2, 8, 'Fideliz', '2019-01-09 11:17:24', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '287433527', '', 80),
(45, 0, 2, 8, 'Fideliz', '2019-01-09 11:19:17', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '78623756', '', 85),
(46, 0, 2, 8, 'Fideliz', '2019-01-09 11:21:09', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '852587963', '', 90),
(47, 0, 2, 8, 'Fideliz', '2019-01-09 11:40:16', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '773151896', '', 95),
(48, 0, 2, 8, 'Fideliz', '2019-01-21 21:31:58', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '974264699', '', 100),
(49, 0, 2, 8, 'Fideliz', '2019-01-21 21:54:50', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '76786324', '', 105),
(50, 0, 2, 8, 'Fideliz', '2019-01-21 21:55:59', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '513106325', '', 110),
(51, 14, 2, 8, 'Fideliz', '2019-03-07 13:10:34', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '905306194', 'Shampooing', 10),
(52, 14, 2, 8, 'Fideliz', '2019-03-07 13:50:19', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '677632012', 'Brushing', 50.55),
(53, 14, 2, 8, 'Fideliz', '2019-03-07 14:32:02', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '768803968', 'Brushing', 50.55),
(54, 14, 2, 8, 'Fideliz', '2019-03-07 14:34:49', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '765355183', 'Brushing', 50.55),
(55, 14, 2, 8, 'Fideliz', '2019-03-07 14:51:48', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '92346410', 'Brushing', 50.55),
(56, 14, 2, 8, 'Fideliz', '2019-03-08 08:44:03', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '735602574', 'test', 0),
(57, 14, 2, 8, 'Fideliz', '2019-03-08 09:32:17', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '485806402', 'test', 0),
(58, 14, 2, 8, 'Fideliz', '2019-03-08 09:36:30', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '223105914', 'test', 0),
(59, 14, 2, 8, 'Fideliz', '2019-03-08 09:38:31', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '498225530', 'test', 0),
(60, 14, 2, 8, 'Fideliz', '2019-03-08 09:44:10', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '164372961', 'test', 0),
(61, 14, 2, 8, 'Fideliz', '2019-03-08 09:50:48', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '173973683', 'Brushing', 50.55),
(62, 14, 2, 8, 'Fideliz', '2019-03-08 09:51:29', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '28756285', 'test', 0),
(63, 14, 2, 8, 'Fideliz', '2019-03-08 09:54:11', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '6382662', 'Brushing', 50.55),
(64, 15, 2, 8, 'Fideliz', '2019-03-08 09:57:00', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '24749585', 'Brushing', 50.55),
(65, 15, 2, 8, 'Fideliz', '2019-03-09 10:59:55', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '819582998', 'Brushing', 50.55),
(66, 15, 2, 8, 'Fideliz', '2019-03-09 12:13:41', 'Riviere JeanMarc', '2019-03-11 10:40:13', 2, '41443208', 'Brushing', 50.55),
(67, 15, 2, 8, 'Fideliz', '2019-03-11 10:43:44', 'Riviere JeanMarc', '2019-03-11 10:43:44', 1, '666394429', 'TestUn', 90);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `accsociete`
--
ALTER TABLE `accsociete`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `acctclient`
--
ALTER TABLE `acctclient`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cadeaux`
--
ALTER TABLE `cadeaux`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `cartefidelite`
--
ALTER TABLE `cartefidelite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `fidcadeaux`
--
ALTER TABLE `fidcadeaux`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `parametres`
--
ALTER TABLE `parametres`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `planning`
--
ALTER TABLE `planning`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pointage`
--
ALTER TABLE `pointage`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `accsociete`
--
ALTER TABLE `accsociete`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT pour la table `acctclient`
--
ALTER TABLE `acctclient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT pour la table `cadeaux`
--
ALTER TABLE `cadeaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT pour la table `cartefidelite`
--
ALTER TABLE `cartefidelite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pour la table `fidcadeaux`
--
ALTER TABLE `fidcadeaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `parametres`
--
ALTER TABLE `parametres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `planning`
--
ALTER TABLE `planning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;
--
-- AUTO_INCREMENT pour la table `pointage`
--
ALTER TABLE `pointage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
