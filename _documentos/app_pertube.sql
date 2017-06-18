-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.15-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para app_pertube
CREATE DATABASE IF NOT EXISTS `app_pertube` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `app_pertube`;

-- Copiando estrutura para tabela app_pertube.albuns
CREATE TABLE IF NOT EXISTS `albuns` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `IDAlbum` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_album_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_album_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.albuns: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `albuns` DISABLE KEYS */;
/*!40000 ALTER TABLE `albuns` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.amigos
CREATE TABLE IF NOT EXISTS `amigos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario1` int(11) NOT NULL,
  `IDUsuario2` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_amigos_usuariosto` (`IDUsuario1`),
  KEY `FK_amigos_usuariosfrom` (`IDUsuario2`),
  CONSTRAINT `FK_amigos_usuariosfrom` FOREIGN KEY (`IDUsuario2`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_amigos_usuariosto` FOREIGN KEY (`IDUsuario1`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.amigos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `amigos` DISABLE KEYS */;
/*!40000 ALTER TABLE `amigos` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.anuncios
CREATE TABLE IF NOT EXISTS `anuncios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `TitiloAnuncio` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `TipoAnuncio` int(11) NOT NULL,
  `Estado` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Cidade` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Regiao` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `URLs` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `TextoAnuncio` text COLLATE utf8_unicode_ci NOT NULL,
  `DTCriacao` datetime NOT NULL,
  `DTAtualizacao` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_anuncios_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_anuncios_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.anuncios: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `anuncios` DISABLE KEYS */;
INSERT INTO `anuncios` (`ID`, `IDUsuarios`, `TitiloAnuncio`, `TipoAnuncio`, `Estado`, `Cidade`, `Regiao`, `URLs`, `TextoAnuncio`, `DTCriacao`, `DTAtualizacao`) VALUES
	(7, 68, 'dsdsdsds', 2, 'AM', 'Apuí', 'região leste', 'content/images/6598807329614/anuncio/Lc0LKBQEMLxygCaorwHyW2KfqPP3FOBd.jpg', 'dsdsdsds', '2017-06-16 16:13:01', '2017-06-16 16:13:01'),
	(8, 68, 'dsdsdsd', 3, 'AL', 'Anadia', 'região oeste', 'content/images/6598807329614/anuncio/jREVmai0mvT61Yd0kFb8ExIIrLHrmQWA.jpg', 'dsdsdssd', '2017-06-16 16:13:13', '2017-06-16 16:13:13'),
	(9, 68, 'sasasa', 5, 'AM', 'Anori', 'região oeste', 'content/images/6598807329614/anuncio/aYU43EQy9Nhj8C0WUEDnxI3Pnhr76n6q.jpg', 'sasasas', '2017-06-16 16:20:17', '2017-06-16 16:20:17'),
	(10, 68, 'dsdsss', 2, 'AM', 'Anori', 'região leste', 'content/images/6598807329614/anuncio/yzlJMGVAh9Mn4rpRl4jzA19VwxpxMpi8.jpg', 'dsdsdsd', '2017-06-16 16:20:33', '2017-06-16 16:20:33'),
	(11, 68, 'dsdsds', 3, 'AM', 'Anamã', 'região central', 'content/images/6598807329614/anuncio/eET2P2GlNvCnfB3oqzBVntBATlwRZO6V.jpg', 'dsdsdsd', '2017-06-16 16:20:44', '2017-06-16 16:20:44');
/*!40000 ALTER TABLE `anuncios` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.audios
CREATE TABLE IF NOT EXISTS `audios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `NomeAudio` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `URLAudio` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_audios_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_audios_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.audios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `audios` DISABLE KEYS */;
/*!40000 ALTER TABLE `audios` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.auth
CREATE TABLE IF NOT EXISTS `auth` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `IDSocket` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `IDUsername` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `DTLogin` datetime NOT NULL,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IDUsuarios` (`IDUsuarios`),
  KEY `FK_auth_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_auth_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.auth: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` (`ID`, `IDUsuarios`, `IDSocket`, `IDUsername`, `DTLogin`, `Status`) VALUES
	(1, 68, 'rN4Jbwc5f40O5XUIAAAA', '6532165647329', '2017-06-16 09:40:54', 1);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.chat
CREATE TABLE IF NOT EXISTS `chat` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario_TO` int(11) NOT NULL,
  `IDUsuario_FROM` int(11) NOT NULL,
  `DTMensagem` datetime NOT NULL,
  `Mensagem` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_chat_usuarios` (`IDUsuario_TO`),
  KEY `FK_chat_usuarios_2` (`IDUsuario_FROM`),
  CONSTRAINT `FK_chat_usuarios` FOREIGN KEY (`IDUsuario_TO`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_chat_usuarios_2` FOREIGN KEY (`IDUsuario_FROM`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.chat: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.curtir
CREATE TABLE IF NOT EXISTS `curtir` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarioEnvia` int(11) NOT NULL,
  `IDUsuarioRecebe` int(11) NOT NULL,
  `Curtir` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_curtir_usuarios` (`IDUsuarioEnvia`),
  KEY `FK_curtir_usuarios_2` (`IDUsuarioRecebe`),
  CONSTRAINT `FK_curtir_usuarios` FOREIGN KEY (`IDUsuarioEnvia`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_curtir_usuarios_2` FOREIGN KEY (`IDUsuarioRecebe`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.curtir: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `curtir` DISABLE KEYS */;
/*!40000 ALTER TABLE `curtir` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.curto
CREATE TABLE IF NOT EXISTS `curto` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `IDEstriloMusical` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDUsuarios` (`IDUsuarios`),
  KEY `FK_curto_estilo_musical` (`IDEstriloMusical`),
  CONSTRAINT `FK_curto_estilo_musical` FOREIGN KEY (`IDEstriloMusical`) REFERENCES `estilo_musical` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_curto_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.curto: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `curto` DISABLE KEYS */;
INSERT INTO `curto` (`ID`, `IDUsuarios`, `IDEstriloMusical`) VALUES
	(5, 68, 1);
/*!40000 ALTER TABLE `curto` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.emails
CREATE TABLE IF NOT EXISTS `emails` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `Emails` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Emails` (`Emails`),
  KEY `FK_emails_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_emails_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=189 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.emails: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
INSERT INTO `emails` (`ID`, `IDUsuarios`, `Emails`, `Status`) VALUES
	(141, 68, 'fabio.nsousa1@gmail.com', 0),
	(183, 68, 'teste2@teste.com', 1);
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.enderecos
CREATE TABLE IF NOT EXISTS `enderecos` (
  `IDEndereco` int(11) NOT NULL AUTO_INCREMENT,
  `CEP` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `Logradouro` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `Estado` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `Cidade` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `Regiao` char(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Bairro` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `Numero` char(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Complemento` char(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Latitude` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `Longitude` char(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`IDEndereco`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.enderecos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `enderecos` DISABLE KEYS */;
INSERT INTO `enderecos` (`IDEndereco`, `CEP`, `Logradouro`, `Estado`, `Cidade`, `Regiao`, `Bairro`, `Numero`, `Complemento`, `Latitude`, `Longitude`) VALUES
	(92, '02303-130', 'Rua Doutor Natalino Righeto', 'SP', 'São Paulo', '', 'Tucuruvi', '748', '', '-23.4797504', '-46.60963960000001');
/*!40000 ALTER TABLE `enderecos` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.estilo_musical
CREATE TABLE IF NOT EXISTS `estilo_musical` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `EstiloMusical` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.estilo_musical: ~130 rows (aproximadamente)
/*!40000 ALTER TABLE `estilo_musical` DISABLE KEYS */;
INSERT INTO `estilo_musical` (`ID`, `EstiloMusical`) VALUES
	(1, 'Blues'),
	(2, 'R&B/Soul'),
	(3, 'Eletronica'),
	(4, 'Rap & Hip Hop'),
	(5, 'Jazz'),
	(6, 'Gospel'),
	(7, 'Reggae'),
	(8, 'Rock'),
	(9, 'Country'),
	(10, 'Pop'),
	(11, 'Brasileira'),
	(12, 'Musica do mundo'),
	(13, 'Blues Acústico'),
	(14, 'Blues Clássico'),
	(15, 'Blues Elétrico'),
	(16, 'Country Blues'),
	(17, 'Delta Blues'),
	(18, 'Axé'),
	(19, 'Bossa Nova'),
	(20, 'Choro'),
	(21, 'Forró'),
	(22, 'Frevo'),
	(23, 'Maracatu'),
	(24, 'MPB'),
	(25, 'Pagode'),
	(26, 'Samba'),
	(27, 'Samba Enredo'),
	(28, 'Samba Reggae'),
	(29, 'Samba Rock'),
	(30, 'Sertanejo'),
	(31, 'Sertanejo Universitário'),
	(32, 'Americano'),
	(33, 'Bluegrass'),
	(34, 'Country Gospel'),
	(35, 'Honky Tonk'),
	(36, 'Acid Jazz'),
	(37, 'Ambiente'),
	(38, 'Dance'),
	(39, 'Experimental'),
	(40, 'Downtempo'),
	(41, 'Dubstep'),
	(42, 'House'),
	(43, 'Industrial'),
	(44, 'Jungle / Drum ’n’ Bass'),
	(45, 'Lounge'),
	(46, 'Techno'),
	(47, 'Trance'),
	(48, 'Bebop'),
	(49, 'Big Band'),
	(50, 'Contemporâneo'),
	(51, 'Crossover'),
	(52, 'Dixieland'),
	(53, 'Fusion'),
	(54, 'Latino'),
	(55, 'Mainstream'),
	(56, 'Nu-Jazz'),
	(57, 'Ragtime'),
	(58, 'Smooth Jazz'),
	(59, 'Ásia'),
	(60, 'Cajun'),
	(61, 'Caribe'),
	(62, 'Celta'),
	(63, 'Francesa'),
	(64, 'Gaúcha'),
	(65, 'Havaí'),
	(66, 'Indiana'),
	(67, 'Japão'),
	(68, 'Latina'),
	(69, 'Divas'),
	(70, 'Pop Country'),
	(71, 'Pop Latino'),
	(72, 'Pop Teen'),
	(73, 'Disco'),
	(74, 'Doo-Wop'),
	(75, 'Funk'),
	(76, 'Motown'),
	(77, 'Neo Soul'),
	(78, 'R&B'),
	(79, 'Soul'),
	(80, 'Dirty South'),
	(81, 'Gangsta Rap'),
	(82, 'Hardcore Rap'),
	(83, 'Hip Hop'),
	(84, 'Oldschool Rap'),
	(85, 'Rap'),
	(86, 'Rap Alternativo'),
	(87, 'Rap Latino'),
	(88, 'Underground'),
	(89, 'Dancehall'),
	(90, 'Dub'),
	(91, 'Reggae Latino'),
	(92, 'Reggae Raiz'),
	(93, 'Ska'),
	(94, 'Blues Rock'),
	(95, 'College Rock'),
	(96, 'Death Metal'),
	(97, 'Folk Rock'),
	(98, 'Glam Rock'),
	(99, 'Gótico'),
	(100, 'Grunge'),
	(101, 'Hard Rock'),
	(102, 'Indie Rock'),
	(103, 'Metal'),
	(104, 'New Wave'),
	(105, 'Nu-Metal'),
	(106, 'Pop Rock'),
	(107, 'Progressivo'),
	(108, 'Psicodélico'),
	(109, 'Punk'),
	(110, 'Punk Rock'),
	(111, 'Rock Brasil'),
	(112, 'Rock Clássico'),
	(113, 'Rock Inglês'),
	(114, 'Rock Latino'),
	(115, 'Rockabilly'),
	(116, 'Surf Music'),
	(117, 'Doom Metal'),
	(118, 'Speed Metal'),
	(119, 'Power Metal'),
	(120, 'White Metal'),
	(121, 'Black Metal'),
	(122, 'Clássica Cristã'),
	(123, 'Funk Cristão'),
	(124, 'Gospel Latino'),
	(125, 'Hip Hop Cristão'),
	(126, 'Louvor'),
	(127, 'Metal Cristão'),
	(128, 'Pop Cristão'),
	(129, 'Rock Cristão'),
	(130, 'Sertanejo Cristão');
/*!40000 ALTER TABLE `estilo_musical` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.fotos
CREATE TABLE IF NOT EXISTS `fotos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `IDAlbum` int(11) NOT NULL,
  `URLFotos` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_fotos_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_fotos_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.fotos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `fotos` DISABLE KEYS */;
/*!40000 ALTER TABLE `fotos` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.indicou
CREATE TABLE IF NOT EXISTS `indicou` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario1` int(11) NOT NULL,
  `IDUsuario2` int(11) NOT NULL,
  `EmailIndicou` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `AtividadeIndicou` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_indicou_usuarios` (`IDUsuario1`),
  KEY `FK_indicou_usuarios_2` (`IDUsuario2`),
  CONSTRAINT `FK_indicou_usuarios` FOREIGN KEY (`IDUsuario1`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_indicou_usuarios_2` FOREIGN KEY (`IDUsuario2`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.indicou: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `indicou` DISABLE KEYS */;
/*!40000 ALTER TABLE `indicou` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.info_usuarios
CREATE TABLE IF NOT EXISTS `info_usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `PastasUsuario` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `URL` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Code` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_info_usuarios_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_info_usuarios_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.info_usuarios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `info_usuarios` DISABLE KEYS */;
INSERT INTO `info_usuarios` (`ID`, `IDUsuarios`, `PastasUsuario`, `URL`, `Code`) VALUES
	(40, 68, '6598807329614', '', '');
/*!40000 ALTER TABLE `info_usuarios` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.instrumentos
CREATE TABLE IF NOT EXISTS `instrumentos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Instrumentos` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.instrumentos: ~44 rows (aproximadamente)
/*!40000 ALTER TABLE `instrumentos` DISABLE KEYS */;
INSERT INTO `instrumentos` (`ID`, `Instrumentos`) VALUES
	(1, 'Alaúde'),
	(2, 'Agogo'),
	(3, 'Bandolim'),
	(4, 'Banjo'),
	(5, 'Cavaquinho'),
	(6, 'Guitarra'),
	(7, 'Viola'),
	(8, 'Violao'),
	(9, 'Citara'),
	(10, 'Harpa'),
	(11, 'Violino'),
	(12, 'Violoncelo'),
	(13, 'Berimbau'),
	(14, 'Piano'),
	(15, 'Carrilhao'),
	(16, 'Triangulo'),
	(17, 'Bateria'),
	(18, 'Bongo'),
	(19, 'Cuica'),
	(20, 'Pandeiro'),
	(21, 'Repinique'),
	(22, 'Rebolo'),
	(23, 'Surdo'),
	(24, 'Tantã'),
	(25, 'Tambor'),
	(26, 'Tamborim'),
	(27, 'Acordeon'),
	(28, 'Backing vocals'),
	(29, 'Bombardão'),
	(30, 'Cantor(a)'),
	(31, 'Clarineta'),
	(32, 'Contrabaixista (acústico)'),
	(33, 'Contrabaixista (elétrico)'),
	(34, 'Corneta'),
	(35, 'Flauta transversal'),
	(36, 'Trompete'),
	(37, 'Gaita'),
	(38, 'Oboé'),
	(39, 'Órgão'),
	(40, 'Percussão'),
	(41, 'Sanfona'),
	(42, 'Saxofone'),
	(43, 'Teclado'),
	(44, 'Trombone');
/*!40000 ALTER TABLE `instrumentos` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.midia_social
CREATE TABLE IF NOT EXISTS `midia_social` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `TipoMidiaSocial` int(11) NOT NULL,
  `Profile` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_midia_social_usuarios` (`IDUsuarios`),
  KEY `FK_midia_social_tipo_midiasocial` (`TipoMidiaSocial`),
  CONSTRAINT `FK_midia_social_tipo_midiasocial` FOREIGN KEY (`TipoMidiaSocial`) REFERENCES `tipo_midiasocial` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_midia_social_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.midia_social: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `midia_social` DISABLE KEYS */;
INSERT INTO `midia_social` (`ID`, `IDUsuarios`, `TipoMidiaSocial`, `Profile`) VALUES
	(49, 68, 1, 'fabio'),
	(58, 68, 1, 'DSDDSDS'),
	(59, 68, 2, 'dsdsdsdsdsds');
/*!40000 ALTER TABLE `midia_social` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.musicas
CREATE TABLE IF NOT EXISTS `musicas` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `TituloMusica` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `Artista` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `Genero` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `Imagem` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `URLMusica` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_musicas_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_musicas_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.musicas: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `musicas` DISABLE KEYS */;
INSERT INTO `musicas` (`ID`, `IDUsuarios`, `TituloMusica`, `Artista`, `Genero`, `Imagem`, `URLMusica`) VALUES
	(4, 68, 'Nothings Wrong?', 'DevilDriver', 'Metal', 'content/sounds/6598807329614/thumbs/cMcnHKyx6DUYNSymo5HWsFMVtWZ6JQGJ.png', 'content/sounds/6598807329614/cMcnHKyx6DUYNSymo5HWsFMVtWZ6JQGJ.mp3');
/*!40000 ALTER TABLE `musicas` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.notificacoes_usuarios
CREATE TABLE IF NOT EXISTS `notificacoes_usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDTIpoNotificacao` int(11) NOT NULL,
  `IDUsuarioEnvia` int(11) NOT NULL,
  `IDUsuarioRecebe` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_notificacoes_usuarios_tipos_notificacoes` (`IDTIpoNotificacao`),
  KEY `FK_notificacoes_usuarios_usuarios` (`IDUsuarioEnvia`),
  KEY `FK_notificacoes_usuarios_usuarios_2` (`IDUsuarioRecebe`),
  CONSTRAINT `FK_notificacoes_usuarios_tipos_notificacoes` FOREIGN KEY (`IDTIpoNotificacao`) REFERENCES `tipos_notificacoes` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_notificacoes_usuarios_usuarios` FOREIGN KEY (`IDUsuarioEnvia`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_notificacoes_usuarios_usuarios_2` FOREIGN KEY (`IDUsuarioRecebe`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.notificacoes_usuarios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `notificacoes_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificacoes_usuarios` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.orientacao_sexual
CREATE TABLE IF NOT EXISTS `orientacao_sexual` (
  `ID` int(11) DEFAULT NULL,
  `IDUsuarios` int(11) DEFAULT NULL,
  `orientacao` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.orientacao_sexual: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `orientacao_sexual` DISABLE KEYS */;
/*!40000 ALTER TABLE `orientacao_sexual` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.seguir
CREATE TABLE IF NOT EXISTS `seguir` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarioEnvia` int(11) NOT NULL,
  `IDUsuarioRecebe` int(11) NOT NULL,
  `Seguir` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_seguir_usuarios` (`IDUsuarioEnvia`),
  KEY `FK_seguir_usuarios_2` (`IDUsuarioRecebe`),
  CONSTRAINT `FK_seguir_usuarios` FOREIGN KEY (`IDUsuarioEnvia`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_seguir_usuarios_2` FOREIGN KEY (`IDUsuarioRecebe`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.seguir: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `seguir` DISABLE KEYS */;
/*!40000 ALTER TABLE `seguir` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.sexo
CREATE TABLE IF NOT EXISTS `sexo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Sexo` char(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.sexo: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `sexo` DISABLE KEYS */;
INSERT INTO `sexo` (`ID`, `Sexo`) VALUES
	(1, 'Feminino'),
	(2, 'Masculino');
/*!40000 ALTER TABLE `sexo` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.sobre_usuarios
CREATE TABLE IF NOT EXISTS `sobre_usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `Sobre` varchar(250) COLLATE utf8_unicode_ci DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `FK_sobre_usuarios_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_sobre_usuarios_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.sobre_usuarios: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sobre_usuarios` DISABLE KEYS */;
INSERT INTO `sobre_usuarios` (`ID`, `IDUsuarios`, `Sobre`) VALUES
	(4, 68, '');
/*!40000 ALTER TABLE `sobre_usuarios` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.solicitacoes_amizade
CREATE TABLE IF NOT EXISTS `solicitacoes_amizade` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDTouser` int(11) NOT NULL,
  `IDFromuser` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_amigos_usuarios` (`IDTouser`),
  KEY `FK_amigos_usuarios_2` (`IDFromuser`),
  CONSTRAINT `FK_amigos_usuarios` FOREIGN KEY (`IDTouser`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_amigos_usuarios_2` FOREIGN KEY (`IDFromuser`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.solicitacoes_amizade: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `solicitacoes_amizade` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitacoes_amizade` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.status_usuario
CREATE TABLE IF NOT EXISTS `status_usuario` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Status` char(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.status_usuario: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `status_usuario` DISABLE KEYS */;
INSERT INTO `status_usuario` (`ID`, `Status`) VALUES
	(1, 'Ativo'),
	(2, 'Desativado');
/*!40000 ALTER TABLE `status_usuario` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.telefones
CREATE TABLE IF NOT EXISTS `telefones` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `Telefones` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Telefones` (`Telefones`),
  KEY `FK_telefones_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_telefones_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.telefones: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `telefones` DISABLE KEYS */;
INSERT INTO `telefones` (`ID`, `IDUsuarios`, `Telefones`, `Status`) VALUES
	(29, 68, '(11) 99819-2095', 1),
	(47, 68, '(11) 32132-1321', 0);
/*!40000 ALTER TABLE `telefones` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.tipos_notificacoes
CREATE TABLE IF NOT EXISTS `tipos_notificacoes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TipoNotificacoes` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `Tipo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.tipos_notificacoes: ~11 rows (aproximadamente)
/*!40000 ALTER TABLE `tipos_notificacoes` DISABLE KEYS */;
INSERT INTO `tipos_notificacoes` (`ID`, `TipoNotificacoes`, `Tipo`) VALUES
	(1, 'Você recebeu uma solicitação de amizade de:', 'Amizade'),
	(2, 'Aceitou sua solicitação', 'Amizade'),
	(3, 'Curtiu seu perfil', 'Curtir'),
	(4, 'Começou a seguir você', 'Seguir'),
	(5, 'Rejeitou sua solicitação', 'Amizade'),
	(6, 'Desfez Amizade com você', 'Amizade'),
	(7, 'Acessou sua rádio', 'Rádio'),
	(8, 'Indicou [] como:', 'Indicar'),
	(9, 'Publicou', 'Seguir - Generico'),
	(10, 'Visitou seu perfil', 'Visitar'),
	(11, 'Visualizou sua indicação', 'Indicar');
/*!40000 ALTER TABLE `tipos_notificacoes` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.tipo_acesso
CREATE TABLE IF NOT EXISTS `tipo_acesso` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TipoAcesso` char(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.tipo_acesso: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_acesso` DISABLE KEYS */;
INSERT INTO `tipo_acesso` (`ID`, `TipoAcesso`) VALUES
	(1, 'Usuário'),
	(2, 'Estúdio');
/*!40000 ALTER TABLE `tipo_acesso` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.tipo_anuncios
CREATE TABLE IF NOT EXISTS `tipo_anuncios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Anuncios` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.tipo_anuncios: ~13 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_anuncios` DISABLE KEYS */;
INSERT INTO `tipo_anuncios` (`ID`, `Anuncios`) VALUES
	(1, 'Músico'),
	(2, 'Banda'),
	(3, 'Compra'),
	(4, 'Venda'),
	(5, 'Casa de show'),
	(6, 'Loja'),
	(7, 'Escola de música'),
	(8, 'Luthier'),
	(9, 'Foto / Video'),
	(10, 'Aluguel Equipamento'),
	(11, 'Aluguel Instrumento'),
	(12, 'Aluguel Iluminação'),
	(13, 'Estúdio');
/*!40000 ALTER TABLE `tipo_anuncios` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.tipo_midiasocial
CREATE TABLE IF NOT EXISTS `tipo_midiasocial` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `MidiaSocil` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.tipo_midiasocial: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `tipo_midiasocial` DISABLE KEYS */;
INSERT INTO `tipo_midiasocial` (`ID`, `MidiaSocil`) VALUES
	(1, 'facebook'),
	(2, 'google'),
	(3, 'instagram');
/*!40000 ALTER TABLE `tipo_midiasocial` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.toco
CREATE TABLE IF NOT EXISTS `toco` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL DEFAULT '0',
  `IDInstrumento` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_toco_instrumentos` (`IDInstrumento`),
  KEY `FK_toco_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_toco_instrumentos` FOREIGN KEY (`IDInstrumento`) REFERENCES `instrumentos` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_toco_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.toco: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `toco` DISABLE KEYS */;
INSERT INTO `toco` (`ID`, `IDUsuarios`, `IDInstrumento`) VALUES
	(2, 68, 3),
	(3, 68, 2);
/*!40000 ALTER TABLE `toco` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDEndereco` int(11) NOT NULL,
  `Nome` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Sobrenome` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Senha` char(8) COLLATE utf8_unicode_ci NOT NULL,
  `DTNascimento` date NOT NULL,
  `SexoUser` int(11) NOT NULL,
  `DTCriacao` datetime NOT NULL,
  `DTAtualizacao` datetime NOT NULL,
  `Imagem` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `TipoAcesso` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username` (`Username`),
  KEY `FK_usuarios_enderecos` (`IDEndereco`),
  KEY `FK_usuarios_sexo` (`SexoUser`),
  KEY `FK_usuarios_tipo_acesso` (`TipoAcesso`),
  KEY `FK_usuarios_status_usuario` (`Status`),
  CONSTRAINT `FK_usuarios_enderecos` FOREIGN KEY (`IDEndereco`) REFERENCES `enderecos` (`IDEndereco`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_usuarios_sexo` FOREIGN KEY (`SexoUser`) REFERENCES `sexo` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_usuarios_status_usuario` FOREIGN KEY (`Status`) REFERENCES `status_usuario` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_usuarios_tipo_acesso` FOREIGN KEY (`TipoAcesso`) REFERENCES `tipo_acesso` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.usuarios: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`ID`, `IDEndereco`, `Nome`, `Sobrenome`, `Username`, `Senha`, `DTNascimento`, `SexoUser`, `DTCriacao`, `DTAtualizacao`, `Imagem`, `TipoAcesso`, `Status`) VALUES
	(68, 92, 'fabio', 'sousa', '65321656473290', '753951', '1978-03-05', 1, '2017-05-27 17:54:32', '2017-05-27 17:54:32', 'content/images/6598807329614/thumbs/NwLFiNreYBeAubjZsyDAdOGoeqf55uf3.jpg', 1, 1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.videos
CREATE TABLE IF NOT EXISTS `videos` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuarios` int(11) NOT NULL,
  `TituloVideo` char(50) COLLATE utf8_unicode_ci NOT NULL,
  `URLVideo` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_videos_usuarios` (`IDUsuarios`),
  CONSTRAINT `FK_videos_usuarios` FOREIGN KEY (`IDUsuarios`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.videos: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
INSERT INTO `videos` (`ID`, `IDUsuarios`, `TituloVideo`, `URLVideo`) VALUES
	(16, 68, 'ewewewewe', 'Ilo22GwkiJk');
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;

-- Copiando estrutura para tabela app_pertube.visitantes
CREATE TABLE IF NOT EXISTS `visitantes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IDUsuario1` int(11) NOT NULL,
  `IDUsuario2` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_visitantes_usuarios` (`IDUsuario1`),
  KEY `FK_visitantes_usuarios_2` (`IDUsuario2`),
  CONSTRAINT `FK_visitantes_usuarios` FOREIGN KEY (`IDUsuario1`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_visitantes_usuarios_2` FOREIGN KEY (`IDUsuario2`) REFERENCES `usuarios` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Copiando dados para a tabela app_pertube.visitantes: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `visitantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `visitantes` ENABLE KEYS */;

-- Copiando estrutura para procedure app_pertube.ACEITAAMIZADE
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `ACEITAAMIZADE`(IN `notifc` INT, IN `user_to` INT, IN `usert_from` INT





)
BEGIN

	IF NOT EXISTS (
		SELECT
			1
		FROM
			amigos
		WHERE
			IDUsuario1 = user_to
		AND
			IDUsuario2 = usert_from
		OR
			IDUsuario1 = usert_from
		AND
			IDUsuario2 = user_to)
	THEN
		INSERT INTO amigos 
	       (IDUsuario1, IDUsuario2) 
	   VALUES 
	       (user_to, usert_from);	
	
		UPDATE 
			notificacoes_usuarios 
		SET 
			IDTIpoNotificacao = notifc
		WHERE 
			IDUsuarioEnvia = user_to
		AND
			IDUsuarioRecebe = usert_from;
			
		DELETE FROM solicitacoes_amizade WHERE IDTouser = user_to AND IDFromuser = usert_from OR IDFromuser = user_to AND IDTouser = usert_from;
		
		SELECT '0';
	ELSE	     
  		SELECT '1';
   END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.ANUNCIO
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `ANUNCIO`(
	IN `titulo` VARCHAR(50),
	IN `tipoAnuncio` INT,
	IN `estados` VARCHAR(50),
	IN `cidades` VARCHAR(50),
	IN `regiaoAnuncio` VARCHAR(50),
	IN `caminhoImagem` VARCHAR(250),
	IN `textoAnuncio` TEXT,
	IN `userLogado` INT
)
BEGIN
	INSERT INTO anuncios 
	     (IDUsuarios, TitiloAnuncio, TipoAnuncio, Estado, Cidade, Regiao, URLs, TextoAnuncio, DTCriacao, DTAtualizacao) 
	 	VALUES 
	     (userLogado, titulo, tipoAnuncio, estados, cidades, regiaoAnuncio, caminhoImagem, textoAnuncio, NOW(), NOW());
	     
  	SELECT 
		a.ID,
		a.TitiloAnuncio,
		a.TipoAnuncio,
		b.ID as IDAnuncios,
		b.Anuncios,
		a.Estado,
		a.Cidade,
		a.Regiao,
		a.URLs,
		a.TextoAnuncio,
		a.DTCriacao,
		a.DTAtualizacao 
	FROM 
		anuncios a
	LEFT JOIN tipo_anuncios b ON
		b.ID = a.TipoAnuncio
	WHERE 
		a.IDUsuarios = userLogado;
		
	SELECT 
			a.ID,
			a.Anuncios
		FROM
			tipo_anuncios a;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.ATUALIZACOES
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `ATUALIZACOES`(IN `userName1` VARCHAR(50), IN `userName2` VARCHAR(50))
BEGIN
	DECLARE ID_1 INT;
	DECLARE ID_2 INT;
	
	SET ID_1 = (SELECT b.IDUsuarios FROM auth b WHERE b.IDUsername = userName1);
	SET ID_2 = (SELECT b.IDUsuarios FROM auth b WHERE b.IDUsername = userName2);

	SELECT
		a.ID,
		a.Nome, 
		a.Username as IDUsername, 
		a.Imagem,
		IF(b.Status IS NULL,0,1) AS Status,
		IF(c.IDUsuario1 IS NULL,0,1) AS Amigo,
		b.IDSocket,
		d.ID as IDSolicitacao
	FROM
		usuarios a
	LEFT JOIN auth b on
		b.IDUsuarios = a.ID
	LEFT JOIN amigos c on
		c.IDUsuario1 = a.ID
	LEFT JOIN solicitacoes_amizade d on
		d.IDTouser = ID_1 || d.IDFromuser = ID_2
	WHERE
		b.IDUsuarios = ID_1;
	
	
	SELECT
		a.ID,
		a.Nome, 
		a.Username as IDUsername, 
		a.Imagem,
		IF(b.Status IS NULL,0,1) AS Status,
		IF(c.IDUsuario1 IS NULL,0,1) AS Amigo,
		b.IDSocket,
		d.ID as IDSolicitacao
	FROM
		usuarios a
	LEFT JOIN auth b on
		b.IDUsuarios = a.ID
	LEFT JOIN amigos c on
		c.IDUsuario1 = a.ID
	LEFT JOIN solicitacoes_amizade d on
		d.IDTouser = ID_2 || d.IDFromuser = ID_1
	WHERE
		b.IDUsuarios = ID_2;
	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.ATUALIZA_FRM_ENDERECO
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `ATUALIZA_FRM_ENDERECO`(
	IN `cep_user` VARCHAR(50),
	IN `logradouro_user` VARCHAR(50),
	IN `estado_user` VARCHAR(50),
	IN `cidadel_user` VARCHAR(50),
	IN `regiao_user` VARCHAR(50),
	IN `bairro_user` VARCHAR(50),
	IN `numero_user` VARCHAR(50),
	IN `complemento_user` VARCHAR(50),
	IN `latitude_user` VARCHAR(50),
	IN `longitude_user` VARCHAR(50)
,
	IN `IDSocket_user` VARCHAR(50)
)
BEGIN
	DECLARE IDEnd INT;
	
	SET IDEnd = (SELECT b.IDEndereco FROM auth a LEFT JOIN usuarios b ON b.ID = a.IDUsuarios WHERE a.IDSocket = IDSocket_user);
	
	UPDATE enderecos SET 
		CEP = cep_user,
		Logradouro = logradouro_user,
		Estado = estado_user,
		Cidade = cidadel_user,
		Regiao = regiao_user,		
		Bairro = bairro_user,
		Numero = numero_user,
		Complemento = complemento_user,
		Latitude = latitude_user,
		Longitude = longitude_user
	WHERE 
		IDEndereco = IDEnd;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.ATUALIZA_FRM_GERAL
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `ATUALIZA_FRM_GERAL`(
	IN `nome_user` VARCHAR(50),
	IN `sobrenome_user` VARCHAR(50),
	IN `username_user` VARCHAR(50),
	IN `senha_user` VARCHAR(50),
	IN `data_user` DATE,
	IN `sexo_user` INT,
	IN `sobre_user` VARCHAR(250)

,
	IN `IDSocket_user` VARCHAR(50)










)
BEGIN
	DECLARE IDs INT;
	
	SET IDs = (SELECT a.IDUsuarios FROM auth a WHERE a.IDSocket = IDSocket_user);
	
	IF EXISTS (
		SELECT 
			ID
		FROM
			usuarios
		WHERE
			Username = username_user
		AND
			Username <> username_user) 
		THEN
		SELECT 0 as result;
	ELSE	
		UPDATE usuarios SET 
			Nome = nome_user,
			Sobrenome = sobrenome_user,
			Username = username_user,		
			Senha = senha_user,
			DTNascimento = data_user,
			SexoUser = sexo_user  
		WHERE 
			ID = IDs;
		SELECT 1 as result;		
		IF NOT EXISTS (
			SELECT
				ID
			FROM
				sobre_usuarios
			WHERE
				IDUsuarios = IDs) 
			THEN
				INSERT INTO sobre_usuarios (IDUsuarios, Sobre) VALUES (IDs, sobre_user);			
		ELSE
				UPDATE sobre_usuarios SET
					Sobre = sobre_user
				WHERE
					IDUsuarios = IDs;
		END IF;
	END IF;	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.AUTH
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `AUTH`(IN `IDUsuariosIN` INT, IN `IDSocketIN` CHAR(50), IN `IDUsernameIN` CHAR(50), IN `CurrentDate` DATETIME

)
BEGIN
	INSERT INTO auth 
     (IDUsuarios,IDSocket,IDUsername,DTLogin, Status) 
 	VALUES 
     (IDUsuariosIN, IDSocketIN, IDUsernameIN, CurrentDate, 1);
     
   SELECT
   	a.Username,
   	b.IDSocket,
   	c.PastasUsuario
   FROM
   	usuarios a
	LEFT JOIN auth b on
		b.IDUsername = a.Username
	LEFT JOIN info_usuarios c on
		c.IDUsuarios = (SELECT ID FROM usuarios WHERE Username = IDUsernameIN)
   WHERE
   	a.Username = IDUsernameIN;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.CADASTRAR
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `CADASTRAR`(
	IN `cad_nome` VARCHAR(50),
	IN `cad_sobrenome` VARCHAR(50),
	IN `cad_email` VARCHAR(50),
	IN `cad_celular` VARCHAR(50),
	IN `cad_dtnascimento` DATE,
	IN `cad_sexo` INT,
	IN `cad_senha` CHAR(50)






















)
BEGIN
	DECLARE pastas   VARCHAR(50);
	DECLARE cad_username VARCHAR(50);
								
	SET cad_username = FLOOR(6532165499790 + (RAND() * 2598765));
	SET pastas   = FLOOR(6598794465390 + (RAND() * 654621369));
	
	/********* cadastro endereco*/
		IF EXISTS(
			SELECT DISTINCT 
				a.ID 
			FROM 
				usuarios a 
			LEFT JOIN emails b ON 
				b.IDUsuarios = a.ID 
			LEFT JOIN telefones c ON 
				c.IDUsuarios = a.ID 
			WHERE 
				a.Username = cad_username) THEN	
			select 0 as error;
		ELSEIF(
			SELECT DISTINCT 
				a.ID 
			FROM 
				usuarios a 
			LEFT JOIN emails b ON 
				b.IDUsuarios = a.ID 
			LEFT JOIN telefones c ON 
				c.IDUsuarios = a.ID 
			WHERE  
				b.Emails = cad_email) THEN	
			select 1 as error;
		ELSEIF(
			SELECT DISTINCT 
				a.ID 
			FROM 
				usuarios a 
			LEFT JOIN emails b ON 
				b.IDUsuarios = a.ID 
			LEFT JOIN telefones c ON 
				c.IDUsuarios = a.ID 
			WHERE 
				c.Telefones = cad_celular) THEN	
			select 2 as error;
		ELSE  
			#ENDEREÇO   	
			INSERT INTO enderecos 
		   (
				CEP,
				Logradouro,
				Estado,
				Cidade,
				Regiao,
				Bairro,
				Numero,
				Complemento,
				Latitude,
				Longitude
			)
		 	VALUES 
		   (
				' ', 
				' ', 
				' ', 
				' ', 
				' ', 
				' ', 
				' ', 
				' ', 
				'-14.235004', 
				'-51.92527999999999'
			);
			#USUARIOS	
			INSERT INTO usuarios 
	      (
		      IDEndereco,
			  	Nome,
				Sobrenome,
				Username,
				Senha,
				DTNascimento,
				SexoUser,
				DTCriacao,
				DTAtualizacao,
				Imagem,
				TipoAcesso,
				Status
			) 
	   	VALUES 
	      (
	      	(SELECT IDEndereco FROM enderecos ORDER BY IDEndereco DESC LIMIT 1),
				cad_nome,
				cad_sobrenome,
				cad_username,
				cad_senha,
				cad_dtnascimento,
				cad_sexo,
				NOW(),
				NOW(),
				'content/images/noimage.jpg',
				1,
				1
			);   
	   	#INFORMAÇÕES DO USUÁRIO	   
	      INSERT INTO info_usuarios 
	      (
				IDUsuarios,
				PastasUsuario,
				URL,
				Code
			) 
	   	VALUES 
	      (
				(SELECT ID FROM usuarios ORDER BY ID DESC LIMIT 1),
				pastas,
				'',
				''
			);
			#EMAILS
			INSERT INTO emails
	      (
	      	IDUsuarios,
				Emails,
				Status			
			) 
	   	VALUES 
	      (
				(SELECT ID FROM usuarios ORDER BY ID DESC LIMIT 1),
				cad_email,
				1
			);
			#TELEFONES
			INSERT INTO telefones 
	      (
	      	IDUsuarios,
				Telefones,
				Status				
			) 
	   	VALUES 
	      (
				(SELECT ID FROM usuarios ORDER BY ID DESC LIMIT 1),
				cad_celular,
				1
			);
			#RETORNO	 
	      SELECT 
		   	a.ID,
				c.Emails,
				a.Senha,
				a.Username,
				b.PastasUsuario 
			FROM 
				usuarios a
			JOIN info_usuarios b on
				b.IDUsuarios = a.ID
			JOIN emails c on
				c.IDUsuarios = a.ID
			WHERE 
				c.Emails = cad_email 
			AND 
				a.Senha = cad_senha
			LIMIT 1;			    		
      END IF;			
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.CHAT
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `CHAT`(
	IN `chat_to` CHAR(50),
	IN `chat_from` CHAR(50)





)
BEGIN
	set chat_to   = (SELECT ID FROM usuarios WHERE Username = chat_to);
	set chat_from = (SELECT ID FROM usuarios WHERE Username = chat_from);
	
	SELECT
		a.Mensagem,
		a.DTMensagem,
		b.Nome AS Nome_to,
		(SELECT Nome FROM usuarios WHERE ID = chat_to) AS Nome_from,
		b.Imagem,
		(SELECT Username FROM usuarios WHERE ID = chat_to) AS UsernameTo,
		b.Username AS UsernameFrom		
	FROM 
		chat a
	JOIN usuarios b on
		b.ID = a.IDUsuario_TO
	WHERE 
		a.IDUsuario_TO = chat_from
	AND
		a.IDUsuario_FROM = chat_to;
		
	SELECT
		a.Mensagem,
		a.DTMensagem,
		b.Nome,
		b.Imagem,
		b.Username
	FROM 
		chat a
	JOIN usuarios b on
		b.ID = a.IDUsuario_TO
	WHERE 
		a.IDUsuario_TO = chat_to
	AND
		a.IDUsuario_FROM = chat_from;
	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.CURTIR
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `CURTIR`(
	IN `tipo` INT,
	IN `user_to` CHAR(50),
	IN `user_from` CHAR(50)









)
BEGIN
	IF EXISTS (
		SELECT
			Curtir
		FROM
			curtir
		WHERE
			IDUsuarioEnvia = user_to
		AND
			IDUsuarioRecebe = user_from) 
	THEN
		DELETE FROM curtir WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from;
		DELETE FROM notificacoes_usuarios WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from AND IDTIpoNotificacao = tipo;
		SELECT Curtir FROM curtir WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from;
	ELSE
		INSERT INTO curtir 
	     (IDUsuarioEnvia, IDUsuarioRecebe, Curtir) 
	 	VALUES 
	     (user_to, user_from, 1);
  		SELECT Curtir FROM curtir WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from;
   END IF;  
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.CURTO
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `CURTO`(
	IN `userLogados` VARCHAR(50),
	IN `IDCurto` INT
)
BEGIN		
	DECLARE IDSockets INT;

	SET IDSockets = (SELECT a.IDUsuarios FROM auth a WHERE a.IDSocket = userLogados);
	
	INSERT INTO curto
		(IDUsuarios,IDEstriloMusical) 
	VALUES 
		(IDSockets,IDCurto);
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.DESFAZERAMIZADE
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `DESFAZERAMIZADE`(IN `notify` INT, IN `idUser_To` INT, IN `idUser_From` INT)
BEGIN
	DELETE FROM amigos WHERE IDUsuario1 = idUser_To AND IDUsuario2 = idUser_From;
	DELETE FROM amigos WHERE IDUsuario1 = idUser_From AND IDUsuario2 = idUser_To;
	
	DELETE FROM solicitacoes_amizade WHERE IDTouser = idUser_To AND IDFromuser = idUser_From;
	DELETE FROM solicitacoes_amizade WHERE IDTouser = idUser_From AND IDFromuser = idUser_To;
	
	SELECT
		(select Nome from usuarios where ID = idUser_To) as Nome1,
		(select Username from usuarios where ID = idUser_To) as Username1,
		b.Nome,
		b.Username,
		c.IDSocket
	FROM
		usuarios b
	right join auth c on
		c.IDUsuarios = b.ID
	WHERE
		c.IDUsuarios = idUser_To
	AND
		b.ID = idUser_To
	
	union all
	
	SELECT
		(select Nome from usuarios where ID = idUser_From) as Nome1,
		(select Username from usuarios where ID = idUser_From) as Username1,
		b.Nome,
		b.Username,
		c.IDSocket
	FROM
		usuarios b
	right join auth c on
		c.IDUsuarios = b.ID
	WHERE
		c.IDUsuarios = idUser_From
	AND
		b.ID = idUser_From;	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.EDITAR
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `EDITAR`(
	IN `userName` CHAR(50),
	IN `token` CHAR(50)















)
BEGIN
	DECLARE IDUsuarios INT;	
	SET IDUsuarios = (SELECT y.ID FROM usuarios y WHERE y.Username = userName);

	IF EXISTS (
		SELECT
			a.ID,
			a.Nome,
			a.Sobrenome,
			a.Username,
			a.Imagem,
			IF(b.Status IS NULL,0,1) AS Status
		FROM
			usuarios a
		LEFT JOIN auth b on
			b.IDUsuarios = a.ID
		WHERE
			a.Username = userName
		AND
			b.IDSocket = token
	)
	THEN
		SELECT
			a.Nome,
			a.Sobrenome,
			a.Username,
			a.Senha,
			a.DTNascimento,
			a.SexoUser,
			a.Imagem,
			b.Sobre,
			c.PastasUsuario
		FROM
			usuarios a
		LEFT JOIN sobre_usuarios b ON
			b.IDUsuarios = a.ID
		LEFT JOIN info_usuarios c ON
			c.IDUsuarios = a.ID
		WHERE
			a.ID = IDUsuarios;
			
		SELECT
			b.CEP,
			b.Logradouro,
			b.Estado, 
			b.Cidade,
			b.Regiao,
			b.Bairro,
			b.Numero,
			b.Complemento,
			b.Latitude,
			b.Longitude
		FROM
			usuarios a
		LEFT JOIN enderecos b ON
			b.IDEndereco = a.IDEndereco
		WHERE
			a.ID = IDUsuarios;
			
		SELECT
			b.ID,
			b.Emails,
			b.Status
		FROM
			usuarios a
		LEFT JOIN emails b ON
			b.IDUsuarios = a.ID
		WHERE
			a.ID = IDUsuarios;
			
			
		SELECT
			b.ID,
			b.Telefones,
			b.Status
		FROM
			usuarios a
		LEFT JOIN telefones b ON
			b.IDUsuarios = a.ID
		WHERE
			a.ID = IDUsuarios;
			
		
		SELECT
			b.ID,
			b.TipoMidiaSocial,
			b.Profile
		FROM
			usuarios a
		LEFT JOIN midia_social b ON
			b.IDUsuarios = a.ID
		WHERE
			a.ID = IDUsuarios;
			
		SELECT
			b.ID,
			b.Instrumentos
		FROM
			toco a
		LEFT JOIN instrumentos b ON
			b.ID = a.IDInstrumento
		WHERE
			a.IDUsuarios = IDUsuarios;
			
		SELECT
			a.ID,
			a.Instrumentos
		FROM
			instrumentos a;
			
		SELECT
			b.ID,
			b.EstiloMusical
		FROM
			curto a
		LEFT JOIN estilo_musical b ON
			b.ID = a.IDEstriloMusical
		WHERE
			a.IDUsuarios = IDUsuarios;
			
		SELECT
			a.ID,
			a.EstiloMusical
		FROM
			estilo_musical a;
			
		SELECT
			b.ID,
			b.TituloVideo,
			b.URLVideo
		FROM
			usuarios a
		LEFT JOIN videos b ON
			b.IDUsuarios = a.ID
		WHERE
			a.ID = IDUsuarios;
			
		SELECT 
			a.ID,
			a.TituloMusica,
			a.Artista,
			a.Genero,
			a.Imagem,
			a.URLMusica
		FROM 
			musicas a 
		WHERE 
			a.IDUsuarios = IDUsuarios;
			
		SELECT 
			a.ID,
			a.Anuncios
		FROM 
			tipo_anuncios a;
			
		SELECT 
			a.ID,
			a.TitiloAnuncio,
			a.TipoAnuncio,
			b.ID as IDAnuncios,
			b.Anuncios,
			a.Estado,
			a.Cidade,
			a.Regiao,
			a.URLs,
			a.TextoAnuncio,
			a.DTCriacao,
			a.DTAtualizacao 
		FROM 
			anuncios a
		LEFT JOIN tipo_anuncios b ON
			b.ID = a.TipoAnuncio
		WHERE 
			a.IDUsuarios = IDUsuarios;	
	ELSE
		SELECT '1';
   END IF;	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.EMAILS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `EMAILS`(
	IN `IDUser` INT,
	IN `IDEmails` INT,
	IN `Emails_users` VARCHAR(50)
















,
	IN `idChecked` INT
)
BEGIN
	IF EXISTS (
		SELECT
			1
		FROM
			emails
		WHERE
			ID = IDEmails
		OR
			Emails = Emails_users
	)
	THEN
		UPDATE emails SET Emails = Emails_users, Status = 0 WHERE ID = IDEmails;
		UPDATE emails SET Status = 1 WHERE ID = idChecked;
	ELSE
		INSERT INTO emails (IDUsuarios, Emails) VALUES (IDUser, Emails_users);
		UPDATE emails SET Status = 0;
		UPDATE emails SET Status = 1 WHERE ID = idChecked;
   END IF; 	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.HOME
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `HOME`(IN `userSession` VARCHAR(50), IN `Quantidade` INT









)
BEGIN
	DECLARE IDUser INT;

	SET IDUser = (SELECT IDUsuarios FROM auth WHERE IDSocket = userSession);
	
	
			SELECT
				a.ID,
				a.Nome, 
				a.Username, 
				a.Imagem,
				IF(b.Status IS NULL,0,1) AS Status,
				IF(u.IDs IS NULL,0,1) AS Amigo
			FROM
				usuarios a
			LEFT JOIN auth b on
				b.IDUsuarios = a.ID
			LEFT JOIN
			(
			SELECT  case when IDUsuario1 <> IDUser then IDUsuario1 else IDUsuario2 end IDs FROM amigos WHERE IDUsuario1 = IDUser OR IDUsuario2 = IDUser
			) as u on u.IDs = a.ID
			WHERE
				a.ID <> IDUser
			LIMIT Quantidade;

END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.INDICAR
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `INDICAR`(
	IN `idUserIndicador` INT,
	IN `idUserPara` INT,
	IN `notificacaoUser` INT,
	IN `emailUser` VARCHAR(50),
	IN `atividadeUser` VARCHAR(50)










)
BEGIN
	#DECLARE IDsets INT;
	
	#SET IDsets = (SELECT a.ID FROM usuarios a WHERE a.Email = emailUser);
	
	IF EXISTS (
		SELECT
			1
		FROM
			indicou
		WHERE
			IDUsuario1 = idUserIndicador
		AND
			IDUsuario2 = idUserPara
		AND
			EmailIndicou = emailUser)
	THEN
		SELECT
			a.IDSocket,
			a.IDUsername,
			0 as resultado
		FROM
			auth a
		WHERE
			a.IDUsuarios = idUserIndicador;
	ELSE
		INSERT INTO indicou
	     (IDUsuario1, IDUsuario2, EmailIndicou, AtividadeIndicou) 
	 	VALUES 
	     (idUserIndicador, idUserPara, emailUser, atividadeUser);
	     
	   INSERT INTO notificacoes_usuarios
	     (IDTIpoNotificacao, IDUsuarioEnvia, IDUsuarioRecebe) 
	 	VALUES 
	     (notificacaoUser, idUserIndicador, idUserPara);
	   
		SELECT
			a.IDSocket,
			a.IDUsername,
			1 as resultado
		FROM
			auth a
		WHERE
			a.IDUsuarios = idUserIndicador;
   END IF; 
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.LASTID_EMAILS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `LASTID_EMAILS`(
	IN `userLogados` VARCHAR(50)





)
BEGIN
	DECLARE IDSockets INT;

	SET IDSockets = (SELECT a.IDUsuarios FROM auth a WHERE a.IDSocket = userLogados);

	IF NOT EXISTS (		
		SELECT
			ID
		FROM
			emails
	)
	THEN
		INSERT INTO emails (IDUsuarios, Emails, Status) VALUES (IDSockets, ' ', 0);
		SELECT ID FROM emails ORDER BY ID DESC LIMIT 1;
	ELSE
		INSERT INTO emails (IDUsuarios, Emails, Status) VALUES (IDSockets, ' ', 0);
		SELECT ID, 1 AS Adicionar FROM emails ORDER BY ID DESC LIMIT 1;
		#select 0 as result;
   END IF;	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.LASTID_MIDIASOCIAL
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `LASTID_MIDIASOCIAL`(
	IN `userLogados` VARCHAR(50)



)
BEGIN
	DECLARE IDSockets INT;

	SET IDSockets = (SELECT a.IDUsuarios FROM auth a WHERE a.IDSocket = userLogados);

	IF NOT EXISTS (		
		SELECT
			ID
		FROM
			midia_social
	)
	THEN
		INSERT INTO midia_social (IDUsuarios, TipoMidiaSocial, Profile) VALUES (IDSockets, 1, '');
		SELECT ID FROM midia_social ORDER BY ID DESC LIMIT 1;
	ELSE
		INSERT INTO midia_social (IDUsuarios, TipoMidiaSocial, Profile) VALUES (IDSockets, 1, '');
		SELECT ID, 1 AS Adicionar FROM midia_social ORDER BY ID DESC LIMIT 1;
   END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.LASTID_TELEFONES
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `LASTID_TELEFONES`(
	IN `userLogados` VARCHAR(50)


)
BEGIN
	DECLARE IDSockets INT;

	SET IDSockets = (SELECT a.IDUsuarios FROM auth a WHERE a.IDSocket = userLogados);

	IF NOT EXISTS (		
		SELECT
			ID
		FROM
			telefones
	)
	THEN
		INSERT INTO telefones (IDUsuarios, Telefones, Status) VALUES (IDSockets, ' ', 0);
		SELECT ID FROM telefones ORDER BY ID DESC LIMIT 1;
	ELSE
		INSERT INTO telefones (IDUsuarios, Telefones, Status) VALUES (IDSockets, ' ', 0);
		SELECT ID, 1 AS Adicionar FROM telefones ORDER BY ID DESC LIMIT 1;
		#select 0 as result;
   END IF; 
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.LOGIN
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `LOGIN`(
	IN `useremail` VARCHAR(30),
	IN `usersenha` CHAR(8)










)
BEGIN
	select
		a.ID,
		a.Username,
		a.Nome,
		c.Emails,
		b.IDUsuarios,
		b.IDSocket
	from 
		usuarios a
	left join auth b on
		b.IDUsuarios = a.ID
	left join emails c on
		c.IDUsuarios = a.ID	
	where 
		(c.Emails = useremail or a.Username = useremail)
	and
		c.Status = 1
	and
		a.Senha = usersenha;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.MIDIASOCIAL
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `MIDIASOCIAL`(IN `IDSocket` INT, IN `IDProfile` VARCHAR(50), IN `IDMidiaSocial` INT, IN `IDTipoMidiasocial` INT)
BEGIN
	IF EXISTS (
		SELECT
			1
		FROM
			midia_social
		WHERE
			ID = IDMidiaSocial
	)
	THEN
		UPDATE midia_social SET TipoMidiaSocial = IDTipoMidiasocial, Profile = IDProfile WHERE ID = IDMidiaSocial;
	ELSE
		INSERT INTO midia_social (IDUsuarios, TipoMidiaSocial, Profile) VALUES (IDSocket, IDTipoMidiasocial, IDProfile);
   END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.MUDARSTATUS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `MUDARSTATUS`(
	IN `usuario` CHAR(50),
	IN `valor` INT
)
BEGIN
	UPDATE 
		auth a 
	SET 
		a.Status = valor 
	WHERE 
		a.IDSocket = usuario;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.MUSICA
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `MUSICA`(IN `Titulo` VARCHAR(250), IN `Artista` CHAR(50), IN `Genero` CHAR(50), IN `Imagem` VARCHAR(250), IN `Caminho` CHAR(250), IN `IDUser` INT)
BEGIN
	IF NOT EXISTS(
		SELECT
			ID
		FROM
			musicas
		WHERE
			URLMusica = Caminho
	)
	THEN
		INSERT INTO musicas
		(IDUsuarios,TituloMusica,Artista,Genero,Imagem,URLMusica) 
		VALUES 
		(IDUser,Titulo,Artista,Genero,Imagem,Caminho);
		
		SELECT ID, TituloMusica, Artista, Genero, Imagem, URLMusica FROM musicas WHERE IDUsuarios = IDUser AND URLMusica = Caminho ORDER BY ID DESC LIMIT 1;
	ELSE
		SELECT '0' as Retorno;
	END IF;	
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.NOTIFICACOES
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `NOTIFICACOES`(
	IN `Tipo` INT,
	IN `IDUserTo` INT,
	IN `IDUserFrom` INT





)
BEGIN
	INSERT INTO notificacoes_usuarios
		(IDTIpoNotificacao,IDUsuarioEnvia,IDUsuarioRecebe) 
	VALUES 
		(Tipo,IDUserTo,IDUserFrom);
		
	(select
		a.IDTIpoNotificacao,
		b.Nome,
		(select Username from usuarios where ID = IDUserFrom) as Username,
		c.TipoNotificacoes
	from
		notificacoes_usuarios a
	left join usuarios b on
		b.ID = a.IDUsuarioEnvia
	left join tipos_notificacoes c on
		c.ID = a.IDTIpoNotificacao
	where
		a.IDUsuarioEnvia = IDUserTo
	and
		a.IDUsuarioRecebe = IDUserFrom
	)
	union all
	(select
		a.IDTIpoNotificacao,
		b.Nome,
		(select Username from usuarios where ID = IDUserFrom) as Username,
		c.TipoNotificacoes
	from
		notificacoes_usuarios a
	left join usuarios b on
		b.ID = a.IDUsuarioRecebe
	left join tipos_notificacoes c on
		c.ID = a.IDTIpoNotificacao
	where
		a.IDUsuarioEnvia = IDUserFrom
	and
		a.IDUsuarioRecebe = IDUserTo
	);
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.OPENChat
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `OPENChat`(
	IN `usernameUser` CHAR(50)

)
BEGIN
	SELECT DISTINCT 
		Nome, 
		Username 
	FROM 
		usuarios 
	WHERE 
		Username = usernameUser;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.PERFIL
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `PERFIL`(
	IN `userSession` CHAR(50)





)
BEGIN
	SELECT
		a.ID,
		a.Nome,
		a.Sobrenome,
		a.Username,
		a.Imagem,
		IF(b.Status IS NULL,0,1) AS Status
	FROM
		usuarios a
	LEFT JOIN auth b on
		b.IDUsuarios = a.ID
	WHERE
		a.Username = userSession;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.RADIO
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `RADIO`(IN `IDUser` VARCHAR(50))
BEGIN
	SELECT
		a.ID,
		a.TituloMusica,
		a.Artista,
		a.Imagem,
		a.URLMusica
	FROM
		musicas a
	LEFT JOIN auth b ON
		b.IDUsuarios = a.IDUsuarios
	WHERE
		b.IDUsername = IDUser;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.RECUPERASENHA
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `RECUPERASENHA`(
	IN `email_rp` CHAR(50),
	IN `code_rp` CHAR(50),
	IN `url_rp` CHAR(50)


)
BEGIN
	UPDATE 
		info_usuarios 
	SET 
		Code = code_rp,
		URL = url_rp
	WHERE 
		IDUsuarios = (SELECT ID FROM usuarios WHERE Email = email_rp);	
	
	SELECT Email, Celular FROM usuarios WHERE Email = email_rp;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.REJEITAAMIZADE
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `REJEITAAMIZADE`(IN `notifc` INT, IN `user_to` INT, IN `usert_from` INT)
BEGIN
	DELETE FROM solicitacoes_amizade WHERE IDTouser = user_to AND IDFromuser = usert_from OR IDFromuser = user_to AND IDTouser = usert_from;
	
	SELECT '0';
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.REMOVEANUNCIOS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `REMOVEANUNCIOS`(
	IN `IDAnuncio` INT,
	IN `IDUser` INT
)
BEGIN
	DELETE FROM anuncios WHERE ID = IDAnuncio AND IDUsuarios = IDUser;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.REMOVEMUSICAS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `REMOVEMUSICAS`(IN `IDMusica` INT, IN `IDUser` INT)
BEGIN
	DELETE FROM musicas WHERE ID = IDMusica AND IDUsuarios = IDUser;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.REMOVEVIDEOS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `REMOVEVIDEOS`(
	IN `IDVideo` INT,
	IN `IDUser` INT

)
BEGIN
	DELETE FROM videos WHERE ID = IDVideo AND IDUsuarios = IDUser;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.SAIR
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SAIR`(
	IN `socket` CHAR(50)


)
BEGIN
	DELETE FROM auth WHERE IDSocket = socket;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.SEGUIR
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SEGUIR`(
	IN `tipo` INT,
	IN `user_to` CHAR(50),
	IN `user_from` CHAR(50)



)
BEGIN
	IF EXISTS (
		SELECT
			Seguir
		FROM
			seguir
		WHERE
			IDUsuarioEnvia = user_to
		AND
			IDUsuarioRecebe = user_from) 
	THEN
		DELETE FROM seguir WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from;
		DELETE FROM notificacoes_usuarios WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from AND IDTIpoNotificacao = tipo;
		SELECT Seguir FROM seguir WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from;
	ELSE
		INSERT INTO seguir 
	     (IDUsuarioEnvia, IDUsuarioRecebe, Seguir) 
	 	VALUES 
	     (user_to, user_from, 1);
	   SELECT Seguir FROM seguir WHERE IDUsuarioEnvia = user_to AND IDUsuarioRecebe = user_from;
   END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.SESSION
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SESSION`(IN `tokenUser` VARCHAR(50)

)
BEGIN
	select distinct
		a.IDUsuarios,
		a.IDSocket,
		a.DTLogin,
		a.Status,
		b.Nome,
		b.Imagem,
		b.Username,
		b.Status as StatusSis,
		(select IDUsername from auth where IDUsuarios = c.IDTouser) as Username1,
		(select IDSocket from auth where IDUsuarios = c.IDFromuser) as IDSocket1,
		c.ID as solicitacao,
		COUNT(d.IDTIpoNotificacao) as quantidade,	
		e.TipoNotificacoes
	from 
		auth a
	LEFT JOIN usuarios b on
		b.ID = a.IDUsuarios
	LEFT JOIN solicitacoes_amizade c on
		c.IDTouser = b.ID || c.IDFromuser = b.ID
	LEFT JOIN notificacoes_usuarios d on
		d.IDUsuarioRecebe = b.ID
	LEFT JOIN tipos_notificacoes e on
		e.ID = d.IDTIpoNotificacao	
	where 
		a.IDSocket = tokenUser;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.SOLICITACAOMIZADE
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `SOLICITACAOMIZADE`(IN `empty` CHAR(5), IN `user_tos` INT, IN `user_froms` INT
















)
BEGIN	
	IF NOT EXISTS
	(
	   SELECT 
			Status as resultado
		FROM
			solicitacoes_amizade
		WHERE
			IDTouser = user_tos
		AND
			IDFromuser = user_froms				
		UNION ALL				
	   SELECT
			Status as resultado
		FROM
			solicitacoes_amizade
		WHERE
			IDFromuser = user_tos
		AND
			IDTouser = user_froms
	) 
	THEN
		INSERT INTO solicitacoes_amizade 
	     (IDTouser, IDFromuser, Status) 
	 	VALUES 
	     (user_tos, user_froms, 1);	  
		   
	   SELECT
			(select Nome from usuarios where ID = user_tos) as Nome1,
			(select Username from usuarios where ID = user_tos) as Username1,
			b.Nome,
			b.Username,
			c.IDSocket,
			a.ID as IDSolicitacao
		FROM
			solicitacoes_amizade a
		LEFT join usuarios b on
			b.ID = a.IDFromuser
		LEFT join auth c on
			c.IDUsuarios = b.ID
		WHERE
			IDFromuser = user_froms
		AND
			IDTouser = user_tos;			
	ELSE
		select a.Username, b.IDSocket as token, 0 as resultado  from usuarios a join auth b on b.IDUsuarios = a.ID where a.ID = user_tos;
   END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.STATUS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `STATUS`()
BEGIN
	select 
		a.IDSocket, 
		a.IDUsername, 
		a.Status,
		b.Username 
	from 
		auth a
	right join usuarios b on
		b.ID = a.IDUsuarios;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.TELEFONES
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `TELEFONES`(
	IN `IDSocket` VARCHAR(50),
	IN `IDTelefones` INT,
	IN `Telefones_user` VARCHAR(50)
,
	IN `idChecked` INT

)
BEGIN
	IF EXISTS (
		SELECT
			1
		FROM
			telefones
		WHERE
			ID = IDTelefones
		OR
			Telefones = Telefones_user
	)
	THEN
		UPDATE telefones SET Telefones = Telefones_user, Status = 0 WHERE ID = IDTelefones;
		UPDATE telefones SET Status = 1 WHERE ID = idChecked;
	ELSE
		INSERT INTO telefones (IDUsuarios, Telefones) VALUES (IDSocket, Telefones_user);
		UPDATE telefones SET Status = 0;
		UPDATE telefones SET Status = 1 WHERE ID = idChecked;
   END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.TOCO
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `TOCO`(
	IN `userLogados` VARCHAR(50),
	IN `IDToco` INT







)
BEGIN
	DECLARE IDSockets INT;

	SET IDSockets = (SELECT a.IDUsuarios FROM auth a WHERE a.IDSocket = userLogados);
	
	INSERT INTO toco
		(IDUsuarios,IDInstrumento) 
	VALUES 
		(IDSockets,IDToco);
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.VERIFICAEXISTENTES
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `VERIFICAEXISTENTES`(
	IN `Emails_users` VARCHAR(50)

,
	IN `userLogados_0` VARCHAR(50)



)
BEGIN	
	DECLARE IDS INT;	
	SET IDS = (SELECT z.IDUsuarios FROM auth z WHERE z.IDSocket = userLogados_0);
	
	IF EXISTS (
		SELECT 
			a.ID
		FROM
			emails a
		LEFT JOIN auth b ON
			b.IDUsuarios = a.IDUsuarios
		WHERE
			a.Emails = Emails_users
		AND
			a.IDUsuarios <> IDS
	)
	THEN			
		SELECT ID as ID FROM emails WHERE Emails = Emails_users;
	ELSE		
		SELECT 0 as ID;
	END IF;
END//
DELIMITER ;

-- Copiando estrutura para procedure app_pertube.VIDEOS
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `VIDEOS`(
	IN `Title` CHAR(50),
	IN `URL` VARCHAR(250),
	IN `IDUser` INT


)
BEGIN
	IF NOT EXISTS(
		SELECT
			ID
		FROM
			videos
		WHERE
			URLVideo = URL
	)
	THEN
		INSERT INTO videos
		(IDUsuarios,TituloVideo,URLVideo) 
		VALUES 
		(IDUser,Title,URL);
		
		SELECT ID, TituloVideo, URLVideo FROM videos WHERE IDUsuarios = IDUser AND URLVideo = URL ORDER BY ID DESC LIMIT 1;
	ELSE
		SELECT '0' as Retorno;
	END IF;	
END//
DELIMITER ;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
