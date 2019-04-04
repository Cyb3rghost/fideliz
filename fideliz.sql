-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  jeu. 04 avr. 2019 à 11:11
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
  `qrcode` int(11) NOT NULL,
  `prestation` varchar(255) NOT NULL,
  `prix` float NOT NULL,
  `activation` int(11) NOT NULL,
  `cadeaux` varchar(255) NOT NULL,
  `prixcadeaux` float NOT NULL,
  `secteur` varchar(255) NOT NULL,
  `configuration` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `accsociete`
--

INSERT INTO `accsociete` (`id`, `email`, `password`, `confirmation`, `nom`, `prenom`, `adresse`, `nomsociete`, `telephone`, `typecompte`, `nbclient`, `limitclient`, `nbpointage`, `limitpointage`, `debutabo`, `finabo`, `jrestant`, `imgfond`, `imgicon`, `qrcode`, `prestation`, `prix`, `activation`, `cadeaux`, `prixcadeaux`, `secteur`, `configuration`) VALUES
(1, 'ludovic.lvnr@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, 'PAYET', 'Eddy', '56 chemin des fleurs 97400', 'EddyCoiffure', '0692101112', 1, 0, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 'backgroundCarte.jpg', 'logocarte.png', 0, '', 0, 0, '', 0, '0', 0),
(2, 'fideliz@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, 'LEVENEUR', 'Ludovic', '56 chemin des fleurs 97400', 'Fideliz', '0692113344', 0, 0, 10, 57, 15, '2019-03-25', '2019-03-27', 0, 'carddefault.jpg', 'logodefault.png', 383485888, 'Null', 0, 0, 'Brushing', 50.55, '0', 1),
(3, 'blizzard@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, '', '', '', 'Blizzard', '', 2, 0, 10, 0, 15, '0000-00-00', '0000-00-00', 0, 'null', 'null', 0, '', 0, 0, '', 0, '0', 0),
(4, 'brawl@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, '', '', '', 'BrawlStudio', '', 1, 0, 10, 0, 15, '2019-02-09', '2019-03-11', 28, 'null', 'null', 0, '', 0, 0, '', 0, '0', 0),
(5, 'cathy@gmail.com', 'af56310c080ab9d9f3d96be9f16edebf', 1, '', '', '', 'MenageParty', '', 1, 0, 10, 1, 15, '2019-02-10', '2019-03-12', 30, 'BCGC144501D09-02-2019.jpg', 'LOGO517944D09-02-2019.png', 0, '', 0, 0, '', 0, '0', 0),
(6, 'dbz@gmail.com', '9512406d8e0fdb1542ac665e39461f96', 1, 'LEVENEUR', 'Ludovic', '56 Bis Chemin du ruisseau', 'DragonBallZ', '0692102030', 0, 0, 10, 0, 15, '0000-00-00', '0000-00-00', 0, 'carddefault.jpg', 'logodefault.png', 0, '', 0, 0, '', 0, '0', 0),
(7, 'loniweb@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, 'Loni', 'Cedric', '56 chemin des oiseaux', 'Loniweb', '0692101213', 1, 0, 10, 1, 15, '2019-02-18', '2019-03-20', 30, 'BCGC713623D18-02-2019.jpg', 'logodefault.png', 0, '', 0, 0, '', 0, '0', 0),
(8, 'ploumouz@gmail.com', 'cd3661b88633fe744e85154464736546', 1, '', '', '', 'Ploumouz', '', 1, 0, 2, 0, 15, '0000-00-00', '0000-00-00', 0, 'carddefault.jpg', 'logodefault.png', 383485832, '', 0, 0, '', 0, '0', 0),
(9, '', 'da1fdd8296f5bf6790a56762b1266426', 1, '', '', '', '', '', 1, 0, 2, 0, 0, '0000-00-00', '0000-00-00', 0, 'carddefault.jpg', 'logodefault.png', 93332499, '', 0, 0, '', 0, '0', 0),
(17, 'test@gmail.com', 'da1fdd8296f5bf6790a56762b1266426', 1, 'TESTO', 'Testa', '56 chemin des tests', 'Test', '0692101112', 1, 0, 2, 0, 10, '2019-03-27', '2019-04-26', 30, 'carddefault.jpg', 'logodefault.png', 686899493, '', 0, 0, 'Test', 100, 'Coiffure', 0),
(18, 'poulouk@gmail.com', 'da1fdd8296f5bf6790a56762b1266426', 1, 'TATZ', 'Toto', '55 Chemin des alamotos', 'Poulouk', '0692333435', 1, 0, 5, 0, 10, '2019-03-27', '2019-04-26', 30, 'carddefault.jpg', 'logodefault.png', 46171476, '', 0, 0, '', 0, 'Coiffure', 0),
(19, 'kraken@gmail.com', 'da1fdd8296f5bf6790a56762b1266426', 1, 'TOTO', 'Tatz', '45 chemin des mangues batus', 'Kraken', '0692121311', 1, 0, 5, 0, 15, '2019-03-27', '2019-04-26', 29, 'carddefault.jpg', 'logodefault.png', 41788419, '', 0, 0, 'Produit de test', 10, 'Coiffure', 1);

-- --------------------------------------------------------

--
-- Structure de la table `acctclient`
--

CREATE TABLE `acctclient` (
  `id` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `idsouche` int(11) NOT NULL,
  `dinscription` date NOT NULL,
  `naissance` date NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `telephone` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(150) NOT NULL,
  `nbpointage` int(11) NOT NULL,
  `nbcarteterminer` int(11) NOT NULL,
  `nbpointagetotal` int(11) NOT NULL,
  `pointboutique` int(11) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `acctclient`
--

INSERT INTO `acctclient` (`id`, `identreprise`, `idsouche`, `dinscription`, `naissance`, `nom`, `prenom`, `adresse`, `telephone`, `email`, `password`, `nbpointage`, `nbcarteterminer`, `nbpointagetotal`, `pointboutique`, `rating`) VALUES
(1, 2, 0, '2018-11-15', '0000-00-00', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louis', '0692729322', 'ludovic.lvnr@gmail.com', 'adf5fddd3058d38759d3f3859ecc695a', 0, 0, 0, 0, 0),
(2, 2, 0, '2018-11-15', '0000-00-00', 'LEVENEURa', 'Ludovica', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louisaz', '069272932233', 'ludovic.lvnr@gmail.coma', 'adf5fddd3058d38759d3f3859ecc695azz87', 0, 0, 0, 0, 0),
(3, 2, 0, '2018-11-15', '0000-00-00', 'LEVENEURazeaze', 'Ludovicaazeae', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louisaz4552741', '06927293223399', 'ludovic.lvnr@gmail.comaqsdq', 'adf5fddd3058d38759d3f3859ecc695azz87qsd', 0, 0, 0, 0, 0),
(4, 2, 0, '2019-01-04', '0000-00-00', 'RiviÃ¨re', 'Max', '56Bis', '0692659877', 'max@gmail.com', 'edff293d77fa6f0e2ccdfefe35ea2d84', 0, 1, 0, 0, 0),
(5, 2, 0, '2019-01-04', '0000-00-00', 'RiviÃ¨re', 'Max', '56 Rue des encombrants 97421 La riviÃ¨re Saint-Louis', '0692741255', 'max@gmail.com', 'edff293d77fa6f0e2ccdfefe35ea2d84', 0, 3, 0, 0, 0),
(6, 2, 0, '2019-01-04', '0000-00-00', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau', '0692102030', 'dbz@gmail.com', 'fac72322259f2d9ead77a4de15457582', 0, 0, 0, 0, 0),
(7, 2, 0, '2019-01-04', '0000-00-00', 'Titi', 'toto', '30 rue des titis', '0692101112', 'max@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 0, 0),
(8, 2, 0, '2019-01-08', '0000-00-00', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 2, 16, 59, 24, 0),
(15, 1, 8, '2019-01-28', '0000-00-00', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 24, 0),
(16, 3, 8, '2019-01-31', '0000-00-00', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 24, 0),
(17, 5, 8, '2019-02-09', '0000-00-00', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101266', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 1, 1, 24, 0),
(18, 5, 0, '2019-02-10', '0000-00-00', 'Test', 'Totoboc', '56 Chemin des tests', '0692101112', 'totoboc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 0, 0),
(19, 5, 0, '2019-02-10', '0000-00-00', 'Lili', 'Boco', '56 chemin des liloboco', '0692222324', 'liliboco@gmail.com', 'a8c5587bf4dc90f79e065df3af8ebaa7', 0, 0, 0, 0, 0),
(20, 7, 0, '2019-02-18', '0000-00-00', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau', '0692729322', 'ludovic@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 1, 1, 0, 0),
(21, 2, 20, '2019-02-18', '0000-00-00', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau', '0692729322', 'ludovic@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 0, 0, 0),
(22, 2, 0, '2019-03-26', '1993-02-24', 'Mata', 'Boulou', '10 Chemin des ananas', '0692988774', 'mataboulou@gmail.com', 'f07fba82aa77441697dfe31d33ea05b3', 0, 0, 0, 0, 0),
(23, 19, 0, '2019-03-28', '1993-02-20', 'Dag', 'Dodo', '20 Chemin des dodos', '0692101211', 'dagdodo@gmail.com', 'f07fba82aa77441697dfe31d33ea05b3', 0, 0, 0, 0, 0),
(24, 19, 0, '2019-03-28', '1993-02-21', 'Dodo', 'Dagdag', '21 chemin des dagdags', '0693007007', 'dagsdags@gmail.com', 'f07fba82aa77441697dfe31d33ea05b3', 0, 0, 0, 0, 0),
(25, 19, 0, '2019-03-28', '1993-02-22', 'Papa', 'popo', '23 chemin des popos', '0692323635', 'popo@gmail.com', 'f07fba82aa77441697dfe31d33ea05b3', 0, 0, 0, 0, 0),
(26, 19, 0, '2019-03-28', '1993-02-23', 'Pala', 'polo', '24 chemin des polo', '0693325547', 'polo@gmail.com', 'f07fba82aa77441697dfe31d33ea05b3', 0, 0, 0, 0, 0),
(27, 19, 0, '2019-03-28', '1993-02-25', 'Chama', 'Konix', '25 chemin des konix', '0692585754', 'konix@gmail.com', 'f07fba82aa77441697dfe31d33ea05b3', 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `apikey`
--

CREATE TABLE `apikey` (
  `id` int(11) NOT NULL,
  `apikey` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `apikey`
--

INSERT INTO `apikey` (`id`, `apikey`) VALUES
(1, 'dcc26b4ddc95589ea6b8bae1b2d093f4'),
(2, '39bcc8094660893feeddc2807e4598a4'),
(3, '6f8dadfa834e7469322aca6bed520275'),
(4, '38541419c3709189380c6fc0b694d861'),
(5, 'bc86a54251a97058ef830cfc27be3a18'),
(6, '9d7d566946110e986b23403857192264'),
(7, 'c956bf34bfb93327f435a2274701cb20'),
(8, 'd625ef4114a852e8d53acf1e5ba8998f'),
(9, '5605a2d989515419c85223261e9f9bfc'),
(10, '38bda062c019514c6021b15a40cb9b81');

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
(2, 2, 0, 'testingou', 110.91, 1, 1),
(3, 2, 0, 'Coupe hommes', 110, 1, 0),
(8, 2, 0, 'Margarita', 60, 1, 0),
(9, 5, 0, 'Brushing', 20, 1, 0),
(10, 7, 0, 'Brushing', 20, 1, 0),
(11, 7, 0, 'Couleur', 50, 1, 0),
(12, 2, 1, 'TestUn', 90, 1, 0),
(13, 2, 0, 'Hola', 100, 1, 0),
(14, 2, 0, 'Checkbam', 150, 1, 0),
(15, 2, 0, 'Tchuk', 20.2, 1, 0),
(16, 2, 0, 'Blam', 10.88, 1, 0),
(17, 2, 0, 'Testo', 5.55, 1, 0),
(26, 2, 0, 'ProduitDeux', 20, 1, 0),
(27, 2, 0, 'ProduitQuatre', 40, 1, 0),
(28, 2, 0, 'ProduitTrois', 30, 1, 0),
(29, 2, 0, 'ProduitUn', 10, 1, 0),
(30, 2, 0, 'TDeux', 10, 1, 0),
(31, 2, 0, 'TUn', 5, 1, 0),
(32, 2, 0, 'TQuatre', 30, 1, 0),
(33, 2, 0, 'TTrois', 15, 1, 0),
(34, 2, 0, 'Divers', 74.16, 1, 0),
(35, 2, 0, 'PrestaDeux', 20, 1, 0),
(36, 2, 0, 'PrestaTrois', 100.55, 1, 0),
(37, 2, 0, 'PrestaUn', 10, 1, 0),
(42, 2, 2, 'WhatYourName', 78.11, 1, 0),
(43, 2, 2, 'Toctoc', 22.23, 1, 0),
(44, 2, 2, 'Coucou', 10.57, 1, 0),
(45, 17, 0, 'Test', 100, 1, 0),
(46, 19, 0, 'qsdqsdqs', 55.45, 1, 0),
(48, 19, 0, 'Produit de test', 0, 1, 0),
(49, 19, 0, 'Produit de test', 0, 1, 0),
(50, 2, 0, 'Produit de test', 0, 1, 0);

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
(1, 1, '2019-01-07', 'LEVENEUR', 'Ludovic', 0, 15, 1, '1 shampooing', 'carddefault.jpg', 'logodefault.png', '366251495'),
(2, 8, '2019-01-08', 'Riviere', 'JeanMarc', 15, 15, 2, '1 coupe gratuite', 'carddefault.jpg', 'logodefault.png', '589602382'),
(3, 8, '2019-01-09', 'Riviere', 'JeanMarc', 10, 10, 2, '1 shampooing', 'carddefault.jpg', 'logodefault.png', '852587963'),
(4, 8, '2019-01-09', 'Riviere', 'JeanMarc', 10, 10, 2, '1 Brushing', 'carddefault.jpg', 'logodefault.png', '945331638'),
(5, 8, '2019-01-11', 'Riviere', 'JeanMarc', 10, 10, 2, '1 coupe gratuite', 'carddefault.jpg', 'logodefault.png', '57868888'),
(6, 8, '2019-01-11', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 50.55 â‚¬', 'carddefault.jpg', 'logodefault.png', '223241456'),
(7, 8, '2019-01-21', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 50.55 â‚¬', 'BCGC902130D24-01-2019.png', 'LOGO443298D24-01-2019.png', '289122476'),
(8, 8, '2019-02-04', 'Titi', 'toto', 0, 10, 2, 'Brushing - 50.55 â‚¬', 'BCGC902130D24-01-2019.png', 'LOGO443298D24-01-2019.png', '125669880'),
(9, 17, '2019-02-09', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 20 â‚¬', 'carddefault.jpg', 'undefined', '479918552'),
(10, 17, '2019-02-09', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 20 â‚¬', 'carddefault.jpg', 'undefined', ''),
(11, 17, '2019-02-09', 'Riviere', 'JeanMarc', 0, 10, 1, 'Brushing - 20 â‚¬', 'BCGC144501D09-02-2019.jpg', 'LOGO517944D09-02-2019.png', ''),
(12, 20, '2019-02-18', 'LEVENEUR', 'Ludovic', 10, 10, 2, 'Couleur - 50 â‚¬', 'carddefault.jpg', 'logodefault.png', '13390946'),
(13, 20, '2019-02-18', 'LEVENEUR', 'Ludovic', 0, 10, 1, 'Brushing - 20 â‚¬', 'carddefault.jpg', 'logodefault.png', ''),
(14, 8, '2019-03-07', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 50.55 â‚¬', 'carddefault.jpg', 'logodefault.png', '988171050'),
(15, 8, '2019-03-08', 'Riviere', 'JeanMarc', 10, 10, 2, 'Brushing - 50.55 â‚¬', 'carddefault.jpg', 'logodefault.png', '666394429'),
(16, 8, '2019-03-15', 'Riviere', 'JeanMarc', 8, 10, 2, 'testingou - 110.91 â‚¬', 'carddefault.jpg', 'logodefault.png', '335083125'),
(17, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(18, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(19, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(20, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(21, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(22, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(23, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(24, 8, '2019-03-18', 'Riviere', 'JeanMarc', 10, 10, 2, 'Hola', 'carddefault.jpg', 'logodefault.png', '383485888'),
(25, 8, '2019-03-20', 'Riviere', 'JeanMarc', 10, 10, 2, 'Coupe hommes', 'carddefault.jpg', 'logodefault.png', '383485888'),
(26, 8, '2019-03-20', 'Riviere', 'JeanMarc', 10, 10, 2, 'Null', 'carddefault.jpg', 'logodefault.png', '383485888'),
(27, 8, '2019-03-20', 'Riviere', 'JeanMarc', 10, 10, 2, 'Null', 'carddefault.jpg', 'logodefault.png', '383485888'),
(28, 8, '2019-03-20', 'Riviere', 'JeanMarc', 10, 10, 2, 'Null', 'carddefault.jpg', 'logodefault.png', '383485888');

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
(9, 8, 14, '2019-03-08 09:55:19', 'Brushing', 2, '2019-03-08 09:55:19', 988171050, 50.55),
(10, 8, 0, '2019-03-18 15:33:36', 'Test', 2, '2019-03-18 15:33:36', 383485888, 0),
(11, 8, 0, '2019-03-18 16:27:22', 'PrestaTrois', 2, '2019-03-18 16:27:22', 383485888, 100.55),
(12, 8, 0, '2019-03-18 16:35:31', 'Null', 2, '2019-03-18 16:35:31', 383485888, 0),
(13, 8, 0, '2019-03-18 16:38:56', 'Null', 2, '2019-03-18 16:38:56', 383485888, 0),
(14, 8, 0, '2019-03-18 16:43:07', 'Null', 2, '2019-03-18 16:43:07', 383485888, 0),
(15, 8, 0, '2019-03-18 17:17:33', 'Null', 2, '2019-03-18 17:17:33', 383485888, 0),
(16, 8, 0, '2019-03-18 17:25:17', 'Hola', 2, '2019-03-18 17:25:17', 383485888, 100),
(17, 8, 0, '2019-03-18 17:32:28', 'Hola', 2, '2019-03-18 17:32:28', 383485888, 100),
(18, 8, 0, '2019-03-18 17:46:12', 'Hola', 2, '2019-03-18 17:46:12', 383485888, 100),
(19, 8, 22, '2019-03-18 17:54:26', 'Hola', 2, '2019-03-18 17:54:26', 383485888, 100),
(20, 8, 23, '2019-03-18 18:00:02', 'Hola', 2, '2019-03-18 18:00:02', 383485888, 100),
(21, 8, 24, '2019-03-18 18:03:02', 'Hola', 2, '2019-03-18 18:03:02', 383485888, 100),
(22, 8, 25, '2019-03-20 08:19:04', 'Coupe hommes', 2, '2019-03-20 08:19:04', 383485888, 110),
(23, 8, 26, '2019-03-20 08:24:58', 'Null', 2, '2019-03-20 08:24:58', 383485888, 0),
(24, 8, 27, '2019-03-20 12:00:44', 'Margarita', 2, '2019-03-20 12:00:44', 383485888, 60),
(25, 8, 28, '2019-03-20 12:06:00', 'Testo', 2, '2019-03-20 12:06:00', 383485888, 5.55);

-- --------------------------------------------------------

--
-- Structure de la table `notation`
--

CREATE TABLE `notation` (
  `id` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `idclient` int(11) NOT NULL,
  `score` float NOT NULL,
  `basenotation` float NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `notation`
--

INSERT INTO `notation` (`id`, `identreprise`, `idclient`, `score`, `basenotation`, `date`) VALUES
(1, 2, 8, 5, 10, '0000-00-00 00:00:00'),
(2, 2, 8, 5, 10, '0000-00-00 00:00:00'),
(3, 2, 8, 5, 10, '0000-00-00 00:00:00'),
(4, 2, 8, 7.5, 10, 'Thu Mar 21 2019 12:06:40 GMT 0400 (heure du Golfe)'),
(5, 2, 8, 7.5, 10, 'Thu Mar 21 2019 12:45:16 GMT 0400 (heure du Golfe)'),
(6, 2, 8, 5, 10, 'Thu Mar 21 2019 12:51:29 GMT 0400 (heure du Golfe)'),
(7, 2, 8, 10, 10, 'Thu Mar 21 2019 21:49:18 GMT 0400 (heure du Golfe)'),
(8, 2, 8, 7.5, 10, 'Thu Mar 21 2019 21:55:39 GMT 0400 (heure du Golfe)');

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
  `start` date NOT NULL,
  `end` date NOT NULL,
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
(37, 2, 8, 'Coupe avec Eddy', '2019-03-04', '2019-03-07', '18:00:00', '19:00:00', 2, 'Thu, 07 Mar 2019 14:00:00 GMT', 'Thu, 07 Mar 2019 15:00:00 GMT', 8),
(36, 2, 8, 'TchockQuatre', '2019-03-04', '2019-03-04', '14:00:00', '15:00:00', 2, 'Mon, 04 Mar 2019 10:00:00 GMT', 'Mon, 04 Mar 2019 11:00:00 GMT', 8),
(35, 2, 8, 'TchockTrois', '2019-03-04', '2019-03-04', '13:00:00', '14:00:00', 1, 'Mon, 04 Mar 2019 09:00:00 GMT', 'Mon, 04 Mar 2019 10:00:00 GMT', 8),
(34, 2, 8, 'TchockDeux', '2019-03-04', '2019-03-04', '12:00:00', '13:00:00', 1, 'Mon, 04 Mar 2019 08:00:00 GMT', 'Mon, 04 Mar 2019 09:00:00 GMT', 8),
(33, 2, 8, 'Tchock', '2019-03-04', '2019-03-04', '11:00:00', '12:00:00', 1, 'Mon, 04 Mar 2019 07:00:00 GMT', 'Mon, 04 Mar 2019 08:00:00 GMT', 8),
(45, 2, 8, 'TestRDVClient', '2019-03-07', '2019-03-07', '09:45:00', '10:45:00', 2, 'Thu, 07 Mar 2019 05:45:00 GMT', 'Thu, 07 Mar 2019 06:45:00 GMT', 8),
(42, 2, 8, 'zfzfzefe', '2019-03-04', '2019-03-04', '15:15:00', '16:15:00', 2, 'Mon, 04 Mar 2019 11:15:00 GMT', 'Mon, 04 Mar 2019 12:15:00 GMT', 2),
(49, 2, 8, 'MonRDV', '2019-03-07', '2019-03-08', '08:00:00', '09:00:00', 2, 'Fri, 08 Mar 2019 04:00:00 GMT', 'Fri, 08 Mar 2019 05:00:00 GMT', 2),
(48, 2, 8, 'HolaJeCheckEncore', '2019-03-07', '2019-03-07', '12:00:00', '13:00:00', 2, 'Thu, 07 Mar 2019 08:00:00 GMT', 'Thu, 07 Mar 2019 09:00:00 GMT', 8),
(50, 2, 8, 'JeVERDV', '2019-03-09', '2019-03-09', '07:45:00', '08:45:00', 2, 'Sat, 09 Mar 2019 03:45:00 GMT', 'Sat, 09 Mar 2019 04:45:00 GMT', 8),
(54, 2, 7, 'Tchiakaa', '2019-03-06', '2019-03-06', '08:00:00', '09:00:00', 1, 'Wed, 06 Mar 2019 04:00:00 GMT', 'Wed, 06 Mar 2019 05:00:00 GMT', 2),
(53, 2, 21, 'TestAutreClient', '2019-03-05', '2019-03-05', '06:00:00', '07:00:00', 2, 'Tue, 05 Mar 2019 02:00:00 GMT', 'Tue, 05 Mar 2019 03:00:00 GMT', 2),
(55, 2, 7, 'Tchoukou', '2019-03-06', '2019-03-06', '14:00:00', '15:00:00', 1, 'Wed, 06 Mar 2019 10:00:00 GMT', 'Wed, 06 Mar 2019 11:00:00 GMT', 2),
(56, 2, 7, 'Pouloukou', '2019-03-06', '2019-03-06', '16:00:00', '17:00:00', 1, 'Wed, 06 Mar 2019 12:00:00 GMT', 'Wed, 06 Mar 2019 13:00:00 GMT', 2),
(61, 2, 8, 'qsdqsdqsd', '2019-03-07', '2019-03-07', '13:00:00', '14:00:00', 1, 'Thu, 07 Mar 2019 09:00:00 GMT', 'Thu, 07 Mar 2019 10:00:00 GMT', 8),
(62, 2, 8, 'Ludovic LEVENEUR', '2019-03-07', '2019-03-07', '14:00:00', '15:00:00', 1, 'Thu, 07 Mar 2019 10:00:00 GMT', 'Thu, 07 Mar 2019 11:00:00 GMT', 8),
(64, 2, 8, 'qsdqsdqsd', '2019-03-07', '2019-03-07', '08:00:00', '09:00:00', 1, 'Thu, 07 Mar 2019 04:00:00 GMT', 'Thu, 07 Mar 2019 05:00:00 GMT', 8),
(66, 2, 8, '974', '2019-03-07', '2019-03-07', '12:00:00', '13:00:00', 2, 'Fri, 07 Mar 2019 08:00:00 GMT', 'Fri, 07 Mar 2019 09:00:00 GMT', 2),
(67, 2, 8, 'Hellow', '2019-04-01', '2019-04-01', '12:30:00', '13:30:00', 1, 'Mon, 01 Apr 2019 08:30:00 GMT', 'Mon, 01 Apr 2019 09:30:00 GMT', 2);

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
(4, 0, 2, 8, 'Fideliz', '2019-01-08 13:46:01', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '978418961', '', 10),
(2, 0, 2, 1, 'Fideliz', '2019-01-07 12:28:54', 'LEVENEUR Ludovic', '0000-00-00 00:00:00', 2, '366251495', '', 20),
(5, 0, 2, 8, 'Fideliz', '2019-01-08 15:36:36', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '92331003', '', 30),
(6, 0, 2, 8, 'Fideliz', '2019-01-08 15:49:13', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '25956811', '', 40),
(7, 0, 2, 8, 'Fideliz', '2019-01-08 15:51:22', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '237085029', '', 50),
(8, 0, 2, 8, 'Fideliz', '2019-01-09 09:39:02', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '744348816', '', 5),
(9, 0, 2, 8, 'Fideliz', '2019-01-09 09:42:01', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '246464082', '', 55),
(10, 0, 2, 8, 'Fideliz', '2019-01-09 10:43:37', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '367646830', '', 60),
(11, 0, 2, 8, 'Fideliz', '2019-01-09 10:45:15', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '589602382', '', 65),
(12, 0, 2, 8, 'Fideliz', '2019-01-09 11:13:06', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '596496091', '', 70),
(13, 0, 2, 8, 'Fideliz', '2019-01-09 11:16:25', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '123167839', '', 75),
(14, 0, 2, 8, 'Fideliz', '2019-01-09 11:17:24', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '287433527', '', 80),
(15, 0, 2, 8, 'Fideliz', '2019-01-09 11:19:17', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '78623756', '', 85),
(16, 0, 2, 8, 'Fideliz', '2019-01-09 11:21:09', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '852587963', '', 90),
(17, 0, 2, 8, 'Fideliz', '2019-01-09 11:40:16', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '773151896', '', 95),
(18, 0, 2, 8, 'Fideliz', '2019-01-21 21:31:58', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '974264699', '', 100),
(19, 0, 2, 8, 'Fideliz', '2019-01-21 21:54:50', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '76786324', '', 105),
(20, 0, 2, 8, 'Fideliz', '2019-01-21 21:55:59', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '513106325', '', 110),
(21, 0, 2, 17, 'MenageParty', '2019-02-09 14:01:54', 'Riviere JeanMarc', '2019-02-09 14:02:29', 2, '503129946', '', 115),
(22, 0, 2, 7, 'Fideliz', '2019-02-12 05:55:15', 'Titi toto', '2019-02-12 05:55:15', 2, '125669880', '', 120),
(23, 0, 2, 8, 'Fideliz', '2019-02-13 06:19:54', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '529139809', 'Brushing', 50.55),
(24, 0, 2, 8, 'Fideliz', '2019-02-13 08:04:52', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '553885927', 'Brushing', 50.55),
(25, 0, 2, 8, 'Fideliz', '2019-02-13 08:09:22', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '713625711', 'Brushing', 50.55),
(26, 0, 2, 8, 'Fideliz', '2019-02-13 08:11:40', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '959335893', 'Shampooing', 10),
(27, 0, 2, 8, 'Fideliz', '2019-02-13 08:17:12', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '199198164', 'Brushing', 50.55),
(28, 0, 2, 8, 'Fideliz', '2019-02-13 08:18:24', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '928487650', 'Margarita', 15),
(29, 7, 2, 8, 'Fideliz', '2019-02-13 09:41:55', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '63219564', 'Brushing', 50.55),
(30, 7, 2, 8, 'Fideliz', '2019-02-13 09:56:52', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '39438359', 'Brushing', 50.55),
(31, 7, 2, 8, 'Fideliz', '2019-02-13 11:28:13', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '717892863', 'Shampooing', 10),
(32, 12, 7, 20, 'Loniweb', '2019-02-18 12:41:06', 'LEVENEUR Ludovic', '2019-02-18 12:41:57', 2, '201561255', 'Couleur', 50),
(33, 0, 2, 8, 'Fideliz', '2019-01-08 13:46:01', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '978418961', '', 10),
(34, 0, 2, 1, 'Fideliz', '2019-01-07 12:28:54', 'LEVENEUR Ludovic', '0000-00-00 00:00:00', 2, '366251495', '', 20),
(35, 0, 2, 8, 'Fideliz', '2019-01-08 15:36:36', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '92331003', '', 30),
(36, 0, 2, 8, 'Fideliz', '2019-01-08 15:49:13', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '25956811', '', 40),
(37, 0, 2, 8, 'Fideliz', '2019-01-08 15:51:22', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '237085029', '', 50),
(38, 0, 2, 8, 'Fideliz', '2019-01-09 09:39:02', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '744348816', '', 5),
(39, 0, 2, 8, 'Fideliz', '2019-01-09 09:42:01', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '246464082', '', 55),
(40, 0, 2, 8, 'Fideliz', '2019-01-09 10:43:37', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '367646830', '', 60),
(41, 0, 2, 8, 'Fideliz', '2019-01-09 10:45:15', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '589602382', '', 65),
(42, 0, 2, 8, 'Fideliz', '2019-01-09 11:13:06', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '596496091', '', 70),
(43, 0, 2, 8, 'Fideliz', '2019-01-09 11:16:25', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '123167839', '', 75),
(44, 0, 2, 8, 'Fideliz', '2019-01-09 11:17:24', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '287433527', '', 80),
(45, 0, 2, 8, 'Fideliz', '2019-01-09 11:19:17', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '78623756', '', 85),
(46, 0, 2, 8, 'Fideliz', '2019-01-09 11:21:09', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '852587963', '', 90),
(47, 0, 2, 8, 'Fideliz', '2019-01-09 11:40:16', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '773151896', '', 95),
(48, 0, 2, 8, 'Fideliz', '2019-01-21 21:31:58', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '974264699', '', 100),
(49, 0, 2, 8, 'Fideliz', '2019-01-21 21:54:50', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '76786324', '', 105),
(50, 0, 2, 8, 'Fideliz', '2019-01-21 21:55:59', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '513106325', '', 110),
(51, 14, 2, 8, 'Fideliz', '2019-03-07 13:10:34', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '905306194', 'Shampooing', 10),
(52, 14, 2, 8, 'Fideliz', '2019-03-07 13:50:19', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '677632012', 'Brushing', 50.55),
(53, 14, 2, 8, 'Fideliz', '2019-03-07 14:32:02', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '768803968', 'Brushing', 50.55),
(54, 14, 2, 8, 'Fideliz', '2019-03-07 14:34:49', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '765355183', 'Brushing', 50.55),
(55, 14, 2, 8, 'Fideliz', '2019-03-07 14:51:48', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '92346410', 'Brushing', 50.55),
(56, 14, 2, 8, 'Fideliz', '2019-03-08 08:44:03', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '735602574', 'test', 0),
(57, 14, 2, 8, 'Fideliz', '2019-03-08 09:32:17', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '485806402', 'test', 0),
(58, 14, 2, 8, 'Fideliz', '2019-03-08 09:36:30', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '223105914', 'test', 0),
(59, 14, 2, 8, 'Fideliz', '2019-03-08 09:38:31', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '498225530', 'test', 0),
(60, 14, 2, 8, 'Fideliz', '2019-03-08 09:44:10', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '164372961', 'test', 0),
(61, 14, 2, 8, 'Fideliz', '2019-03-08 09:50:48', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '173973683', 'Brushing', 50.55),
(62, 14, 2, 8, 'Fideliz', '2019-03-08 09:51:29', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '28756285', 'test', 0),
(63, 14, 2, 8, 'Fideliz', '2019-03-08 09:54:11', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '6382662', 'Brushing', 50.55),
(64, 15, 2, 8, 'Fideliz', '2019-03-08 09:57:00', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '24749585', 'Brushing', 50.55),
(65, 15, 2, 8, 'Fideliz', '2019-03-09 10:59:55', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '819582998', 'Brushing', 50.55),
(66, 15, 2, 8, 'Fideliz', '2019-03-09 12:13:41', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '41443208', 'Brushing', 50.55),
(67, 15, 2, 8, 'Fideliz', '2019-03-11 10:43:44', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '666394429', 'TestUn', 90),
(68, 16, 2, 8, 'Fideliz', '2019-03-15 08:23:45', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'Toctoc', 22.23),
(69, 16, 2, 8, 'Fideliz', '2019-03-15 08:35:01', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'PrestaTrois', 100.55),
(70, 16, 2, 8, 'Fideliz', '2019-03-15 08:52:32', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'Null', 0),
(71, 16, 2, 8, 'Fideliz', '2019-03-15 10:44:13', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'Null', 0),
(72, 16, 2, 8, 'Fideliz', '2019-03-15 10:46:12', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'Null', 0),
(73, 16, 2, 8, 'Fideliz', '2019-03-15 10:46:59', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'Null', 0),
(74, 16, 2, 8, 'Fideliz', '2019-03-15 10:49:18', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'Null', 0),
(75, 16, 2, 8, 'Fideliz', '2019-03-15 10:53:00', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'WhatYourName', 78.11),
(76, 16, 2, 8, 'Fideliz', '2019-03-15 10:53:50', 'Riviere JeanMarc', '2019-03-15 10:54:08', 2, '335083125', 'Null', 0),
(77, 16, 2, 8, 'Fideliz', '2019-03-15 10:54:36', 'Riviere JeanMarc', '2019-03-15 10:54:36', 2, '335083125', 'Null', 0),
(78, 0, 2, 8, 'Fideliz', '2019-03-18 13:39:18', 'Riviere JeanMarc', '2019-03-18 13:39:18', 2, 'qsdqsdqsdqsd', 'Null', 0),
(79, 0, 2, 8, 'Fideliz', '2019-03-18 13:45:35', 'Riviere JeanMarc', '2019-03-18 13:45:35', 2, 'qsdqsdqsdqsd', 'Null', 0),
(80, 23, 2, 8, 'Fideliz', '2019-03-18 13:46:39', 'Riviere JeanMarc', '2019-03-18 13:46:39', 2, '383485888', 'Null', 0),
(81, 23, 2, 8, 'Fideliz', '2019-03-18 13:47:46', 'Riviere JeanMarc', '2019-03-18 13:47:46', 2, '383485888', 'Null', 0),
(82, 23, 2, 8, 'Fideliz', '2019-03-18 13:49:14', 'Riviere JeanMarc', '2019-03-18 13:49:14', 2, '383485888', 'Brushing', 50.55),
(83, 23, 2, 8, 'Fideliz', '2019-03-18 14:14:37', 'Riviere JeanMarc', '2019-03-18 14:14:37', 2, '383485888', 'Brushing', 50.55),
(84, 23, 2, 8, 'Fideliz', '2019-03-18 14:26:08', 'Riviere JeanMarc', '2019-03-18 14:26:08', 2, '383485888', 'Brushing', 50.55),
(85, 24, 2, 8, 'Fideliz', '2019-03-18 14:33:03', 'Riviere JeanMarc', '2019-03-18 14:33:03', 2, '383485888', 'Brushing', 50.55),
(86, 24, 2, 8, 'Fideliz', '2019-03-18 14:35:01', 'Riviere JeanMarc', '2019-03-18 14:35:01', 2, '383485888', 'Brushing', 50.55),
(87, 24, 2, 8, 'Fideliz', '2019-03-18 14:36:12', 'Riviere JeanMarc', '2019-03-18 14:36:12', 2, '383485888', 'Brushing', 50.55),
(88, 24, 2, 8, 'Fideliz', '2019-03-18 14:40:54', 'Riviere JeanMarc', '2019-03-18 14:40:54', 2, '383485888', 'Brushing', 50.55),
(89, 24, 2, 8, 'Fideliz', '2019-03-18 16:34:18', 'Riviere JeanMarc', '2019-03-18 16:34:18', 2, '383485888', 'Coupe hommes', 110),
(90, 24, 2, 8, 'Fideliz', '2019-03-18 16:37:14', 'Riviere JeanMarc', '2019-03-18 16:37:14', 2, '383485888', 'testingou', 110.91),
(91, 24, 2, 8, 'Fideliz', '2019-03-18 16:41:06', 'Riviere JeanMarc', '2019-03-18 16:41:06', 2, '383485888', 'Null', 0),
(92, 25, 2, 8, 'Fideliz', '2019-03-20 08:16:30', 'Riviere JeanMarc', '2019-03-20 08:16:30', 2, '383485888', 'Divers', 74.16),
(93, 26, 2, 8, 'Fideliz', '2019-03-20 08:23:25', 'Riviere JeanMarc', '2019-03-20 08:23:25', 2, '383485888', 'Checkbam', 150),
(94, 27, 2, 8, 'Fideliz', '2019-03-20 11:59:30', 'Riviere JeanMarc', '2019-03-20 11:59:30', 2, '383485888', 'Tchuk', 20.2),
(95, 28, 2, 8, 'Fideliz', '2019-03-20 12:04:43', 'Riviere JeanMarc', '2019-03-20 12:04:43', 2, '383485888', 'Brushing', 50.55),
(96, 28, 2, 8, 'Fideliz', '2019-03-20 12:05:11', 'Riviere JeanMarc', '2019-03-20 12:05:11', 2, '383485888', 'Null', 0),
(97, 0, 2, 8, 'Fideliz', '2019-03-21 18:49:10', 'Riviere JeanMarc', '2019-03-21 18:49:10', 1, '383485888', 'testingou', 110.91),
(98, 0, 2, 8, 'Fideliz', '2019-03-21 18:55:34', 'Riviere JeanMarc', '2019-03-21 18:55:34', 1, '383485888', 'Checkbam', 150);

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
-- Index pour la table `apikey`
--
ALTER TABLE `apikey`
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
-- Index pour la table `notation`
--
ALTER TABLE `notation`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT pour la table `acctclient`
--
ALTER TABLE `acctclient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT pour la table `apikey`
--
ALTER TABLE `apikey`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT pour la table `cadeaux`
--
ALTER TABLE `cadeaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT pour la table `cartefidelite`
--
ALTER TABLE `cartefidelite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT pour la table `fidcadeaux`
--
ALTER TABLE `fidcadeaux`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT pour la table `notation`
--
ALTER TABLE `notation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `parametres`
--
ALTER TABLE `parametres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT pour la table `planning`
--
ALTER TABLE `planning`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
--
-- AUTO_INCREMENT pour la table `pointage`
--
ALTER TABLE `pointage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
