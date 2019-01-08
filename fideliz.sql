-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mar 08 Janvier 2019 à 15:38
-- Version du serveur :  5.7.24-0ubuntu0.18.04.1
-- Version de PHP :  7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Contenu de la table `accsociete`
--

INSERT INTO `accsociete` (`id`, `email`, `password`, `confirmation`, `nom`, `prenom`, `adresse`, `nomsociete`, `telephone`, `typecompte`, `nbclient`, `limitclient`, `nbpointage`, `limitpointage`, `debutabo`, `finabo`, `jrestant`, `imgfond`, `imgicon`, `apikey`) VALUES
(1, 'ludovic.lvnr@gmail.com', 'd084e2b238981abdfa48f996141473f8', 1, 'PAYET', 'Eddy', '56 chemin des fleurs 97400', 'EddyCoiffure', '0692101112', 1, 0, 0, 0, 0, '0000-00-00', '0000-00-00', 0, 'backgroundCarte.jpg', 'logocarte.png', 'e6c14066a83d3416238afbc40a9f437a'),
(2, 'fideliz@gmail.com', 'dc8aaea07a9ebbc3af3fa62145997e38', 1, 'LEVENEUR', 'Ludovic', '56 chemin des fleurs 97400', 'Fideliz', '0692113344', 0, 0, 10, 2, 15, '0000-00-00', '0000-00-00', 0, 'backgroundCarte.jpg', 'logocarte.png', 'b3470a6aba7953782f54486b8cc28d02');

-- --------------------------------------------------------

--
-- Structure de la table `acctclient`
--

CREATE TABLE `acctclient` (
  `id` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `dinscription` date NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `telephone` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(150) NOT NULL,
  `nbcartetotal` int(11) NOT NULL,
  `nbcarteterminer` int(11) NOT NULL,
  `nbpointagetotal` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `acctclient`
--

INSERT INTO `acctclient` (`id`, `identreprise`, `dinscription`, `nom`, `prenom`, `adresse`, `telephone`, `email`, `password`, `nbcartetotal`, `nbcarteterminer`, `nbpointagetotal`) VALUES
(1, 2, '2018-11-15', 'LEVENEUR', 'Ludovic', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louis', '0692729322', 'ludovic.lvnr@gmail.com', 'adf5fddd3058d38759d3f3859ecc695a', 0, 0, 0),
(2, 2, '2018-11-15', 'LEVENEURa', 'Ludovica', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louisaz', '069272932233', 'ludovic.lvnr@gmail.coma', 'adf5fddd3058d38759d3f3859ecc695azz87', 0, 0, 0),
(3, 2, '2018-11-15', 'LEVENEURazeaze', 'Ludovicaazeae', '56 Bis chemin du ruisseau 97421 La riviÃ¨re saint-louisaz4552741', '06927293223399', 'ludovic.lvnr@gmail.comaqsdq', 'adf5fddd3058d38759d3f3859ecc695azz87qsd', 0, 0, 0),
(4, 2, '2019-01-04', 'RiviÃ¨re', 'Max', '56Bis', '0692659877', 'max@gmail.com', 'edff293d77fa6f0e2ccdfefe35ea2d84', 0, 0, 0),
(5, 2, '2019-01-04', 'RiviÃ¨re', 'Max', '56 Rue des encombrants 97421 La riviÃ¨re Saint-Louis', '0692741255', 'max@gmail.com', 'edff293d77fa6f0e2ccdfefe35ea2d84', 0, 0, 0),
(6, 2, '2019-01-04', 'Toto', 'titi', '30 rue des titis', '0692112233', 'max@gmail.com', 'fac72322259f2d9ead77a4de15457582', 0, 0, 0),
(7, 2, '2019-01-04', 'Titi', 'toto', '30 rue des titis', '0692101112', 'max@gmail.com', '503e3e3e9c7cfc2fff762adac089d2ea', 0, 0, 0),
(8, 2, '2019-01-08', 'Riviere', 'JeanMarc', '56 Rue des oignons 97430 Tampon', '0692101233', 'jeanmarc@gmail.com', '7b95106216e42644047cfb133b09d6b6', 0, 0, 1);

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
  `cadeaux` varchar(255) NOT NULL,
  `imgbackground` varchar(255) NOT NULL,
  `imgicon` varchar(255) NOT NULL,
  `qrcode` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `cartefidelite`
--

INSERT INTO `cartefidelite` (`id`, `idclient`, `datecreation`, `nom`, `prenom`, `nbpointage`, `limitpointage`, `statut`, `cadeaux`, `imgbackground`, `imgicon`, `qrcode`) VALUES
(1, 1, '2019-01-07', 'LEVENEUR', 'Ludovic', 0, 15, 1, '1 shampooing', 'backgroundCarte.jpg', 'logocarte.png', '366251495'),
(2, 8, '2019-01-08', 'Riviere', 'JeanMarc', 2, 15, 1, '1 coupe gratuite', 'backgroundCarte.jpg', 'logocarte.png', '92331003');

-- --------------------------------------------------------

--
-- Structure de la table `pointage`
--

CREATE TABLE `pointage` (
  `id` int(11) NOT NULL,
  `identreprise` int(11) NOT NULL,
  `idclient` int(11) NOT NULL,
  `entreprise` varchar(255) NOT NULL,
  `departpointage` datetime NOT NULL,
  `client` varchar(255) NOT NULL,
  `finpointage` datetime NOT NULL,
  `statut` int(11) NOT NULL,
  `code` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `pointage`
--

INSERT INTO `pointage` (`id`, `identreprise`, `idclient`, `entreprise`, `departpointage`, `client`, `finpointage`, `statut`, `code`) VALUES
(4, 2, 8, 'Fideliz', '2019-01-08 13:46:01', 'Riviere JeanMarc', '2019-01-08 15:36:50', 2, '978418961'),
(2, 2, 1, 'Fideliz', '2019-01-07 12:28:54', 'LEVENEUR Ludovic', '0000-00-00 00:00:00', 1, '366251495'),
(5, 2, 8, 'Fideliz', '2019-01-08 15:36:36', 'Riviere JeanMarc', '2019-01-08 15:36:50', 2, '92331003');

--
-- Index pour les tables exportées
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
-- Index pour la table `cartefidelite`
--
ALTER TABLE `cartefidelite`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pointage`
--
ALTER TABLE `pointage`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `accsociete`
--
ALTER TABLE `accsociete`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `acctclient`
--
ALTER TABLE `acctclient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `cartefidelite`
--
ALTER TABLE `cartefidelite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `pointage`
--
ALTER TABLE `pointage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
