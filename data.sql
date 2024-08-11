-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 09, 2024 at 03:23 PM
-- Server version: 9.0.1
-- PHP Version: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `data`
--

-- --------------------------------------------------------

--
-- Table structure for table `orderProducts`
--

CREATE TABLE `orderProducts` (
  `id` int NOT NULL,
  `orderId` int NOT NULL,
  `productVariantId` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orderProducts`
--

INSERT INTO `orderProducts` (`id`, `orderId`, `productVariantId`, `quantity`) VALUES
(1, 1, 1, 1),
(2, 1, 6, 1),
(3, 1, 11, 2),
(4, 1, 3, 1),
(5, 1, 8, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `customerName` varchar(50) NOT NULL,
  `paymentMethod` varchar(50) NOT NULL,
  `tableId` int NOT NULL,
  `details` json DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `customerName`, `paymentMethod`, `tableId`, `details`, `createdAt`, `updatedAt`) VALUES
(1, 'John Doe', 'Credit Card', 1, '{\"id\": 1, \"date\": \"2024-08-07T17:16:15.157Z\", \"table\": \"MEJA NO 1\", \"products\": [{\"name\": \"Jeruk\", \"price\": 12000, \"total\": 12000, \"variant\": \"DINGIN\", \"category\": \"Minuman\", \"quantity\": 1}, {\"name\": \"Kopi\", \"price\": 6000, \"total\": 6000, \"variant\": \"PANAS\", \"category\": \"Minuman\", \"quantity\": 1}, {\"name\": \"Nasi Goreng + Jeruk Dingin\", \"price\": 23000, \"total\": 46000, \"variant\": null, \"category\": \"Promo\", \"quantity\": 2}, {\"name\": \"Teh\", \"price\": 8000, \"total\": 8000, \"variant\": \"MANIS\", \"category\": \"Minuman\", \"quantity\": 1}, {\"name\": \"Mie\", \"price\": 15000, \"total\": 15000, \"variant\": \"GORENG\", \"category\": \"Makanan\", \"quantity\": 1}], \"grandTotal\": 87000, \"customerName\": \"John Doe\", \"paymentMethod\": \"Credit Card\"}', '2024-08-07 17:16:15', '2024-08-08 15:34:24');

-- --------------------------------------------------------

--
-- Table structure for table `printerJobs`
--

CREATE TABLE `printerJobs` (
  `id` int NOT NULL,
  `printerId` int NOT NULL,
  `productCategoryId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `printerJobs`
--

INSERT INTO `printerJobs` (`id`, `printerId`, `productCategoryId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 3, 1),
(5, 1, 3),
(6, 2, 3),
(7, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `printers`
--

CREATE TABLE `printers` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `printers`
--

INSERT INTO `printers` (`id`, `name`) VALUES
(1, 'Printer Kasir'),
(2, 'Printer Dapur'),
(3, 'Printer Bar');

-- --------------------------------------------------------

--
-- Table structure for table `productCategories`
--

CREATE TABLE `productCategories` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productCategories`
--

INSERT INTO `productCategories` (`id`, `name`) VALUES
(1, 'Minuman'),
(2, 'Makanan'),
(3, 'Promo');

-- --------------------------------------------------------

--
-- Table structure for table `productItems`
--

CREATE TABLE `productItems` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `productCategoryId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productItems`
--

INSERT INTO `productItems` (`id`, `name`, `productCategoryId`) VALUES
(1, 'Jeruk', 1),
(2, 'Teh', 1),
(3, 'Kopi', 1),
(4, 'EXTRA ES BATU', 1),
(5, 'Mie', 2),
(6, 'Nasi Goreng', 2),
(7, 'Nasi Goreng + Jeruk Dingin', 3);

-- --------------------------------------------------------

--
-- Table structure for table `productVariants`
--

CREATE TABLE `productVariants` (
  `id` int NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `price` float NOT NULL,
  `productItemId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `productVariants`
--

INSERT INTO `productVariants` (`id`, `name`, `price`, `productItemId`) VALUES
(1, 'DINGIN', 12000, 1),
(2, 'PANAS', 10000, 1),
(3, 'MANIS', 8000, 2),
(4, 'TAWAR', 5000, 2),
(5, 'DINGIN', 8000, 3),
(6, 'PANAS', 6000, 3),
(7, NULL, 2000, 4),
(8, 'GORENG', 15000, 5),
(9, 'KUAH', 15000, 5),
(10, NULL, 15000, 6),
(11, NULL, 23000, 7);

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `name`) VALUES
(1, 'MEJA NO 1'),
(2, 'MEJA NO 2'),
(3, 'MEJA NO 3');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'John Doe', 'johndoe@example.com', '$2a$08$VottpflZnum22nmV8PGUVucuLHHH6TCv0yHEoNM8BVEUS8VPfUYru');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orderProducts`
--
ALTER TABLE `orderProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productVariantId` (`productVariantId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tableId` (`tableId`);

--
-- Indexes for table `printerJobs`
--
ALTER TABLE `printerJobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `printerId` (`printerId`),
  ADD KEY `printerProductCategoryId` (`productCategoryId`);

--
-- Indexes for table `printers`
--
ALTER TABLE `printers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productCategories`
--
ALTER TABLE `productCategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productItems`
--
ALTER TABLE `productItems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productCategoryId` (`productCategoryId`);

--
-- Indexes for table `productVariants`
--
ALTER TABLE `productVariants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productItemId` (`productItemId`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderProducts`
--
ALTER TABLE `orderProducts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `printerJobs`
--
ALTER TABLE `printerJobs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `printers`
--
ALTER TABLE `printers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `productCategories`
--
ALTER TABLE `productCategories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `productItems`
--
ALTER TABLE `productItems`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `productVariants`
--
ALTER TABLE `productVariants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderProducts`
--
ALTER TABLE `orderProducts`
  ADD CONSTRAINT `orderId` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productVariantId` FOREIGN KEY (`productVariantId`) REFERENCES `productVariants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `tableId` FOREIGN KEY (`tableId`) REFERENCES `tables` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `printerJobs`
--
ALTER TABLE `printerJobs`
  ADD CONSTRAINT `printerId` FOREIGN KEY (`printerId`) REFERENCES `printers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `printerProductCategoryId` FOREIGN KEY (`productCategoryId`) REFERENCES `productCategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productItems`
--
ALTER TABLE `productItems`
  ADD CONSTRAINT `productCategoryId` FOREIGN KEY (`productCategoryId`) REFERENCES `productCategories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `productVariants`
--
ALTER TABLE `productVariants`
  ADD CONSTRAINT `productItemId` FOREIGN KEY (`productItemId`) REFERENCES `productItems` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
