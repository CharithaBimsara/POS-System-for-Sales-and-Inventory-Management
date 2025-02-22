package com.example.demo.service;

import com.example.demo.dto.OrderDTO;
import com.example.demo.dto.OrderItemDTO;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

//@Service
//public class OrderServiceImpl implements OrderService {
//
//    @Autowired
//    private OrderRepository orderRepository;
//
//    @Autowired
//    private ProductService productService;
//
//    @Override
//    public OrderDTO createOrder(OrderDTO orderDTO) {
//        Order order = new Order();
//        order.setTotalAmount(orderDTO.getTotalAmount());
//        order.setStatus(orderDTO.getStatus());
//        order.setPaymentMethod(orderDTO.getPaymentMethod());
//        order.setCreatedAt(orderDTO.getCreatedAt());
//        Order savedOrder = orderRepository.save(order);
//        return new OrderDTO(savedOrder.getId(), savedOrder.getCustomer().getId(), savedOrder.getUser().getId(), savedOrder.getTotalAmount(), savedOrder.getStatus(), savedOrder.getPaymentMethod(), savedOrder.getCreatedAt(), savedOrder.getOrderItems().stream().map(orderItem -> new OrderItemDTO(orderItem.getId(), orderItem.getOrder().getId(), orderItem.getProduct().getId(), orderItem.getQuantity(), orderItem.getUnitPrice(), orderItem.getSubtotal())).collect(Collectors.toList()));
//    }
//
//    @Override
//    public OrderDTO getOrderById(Long id) {
//        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
//        return new OrderDTO(order.getId(), order.getCustomer().getId(), order.getUser().getId(), order.getTotalAmount(), order.getStatus(), order.getPaymentMethod(), order.getCreatedAt(), order.getOrderItems().stream().map(orderItem -> new OrderItemDTO(orderItem.getId(), orderItem.getOrder().getId(), orderItem.getProduct().getId(), orderItem.getQuantity(), orderItem.getUnitPrice(), orderItem.getSubtotal())).collect(Collectors.toList()));
//    }
//
//    @Override
//    public List<OrderDTO> getAllOrders() {
//        return orderRepository.findAll().stream()
//                .map(order -> new OrderDTO(order.getId(), order.getCustomer().getId(), order.getUser().getId(), order.getTotalAmount(), order.getStatus(), order.getPaymentMethod(), order.getCreatedAt(), order.getOrderItems().stream().map(orderItem -> new OrderItemDTO(orderItem.getId(), orderItem.getOrder().getId(), orderItem.getProduct().getId(), orderItem.getQuantity(), orderItem.getUnitPrice(), orderItem.getSubtotal())).collect(Collectors.toList())))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
//        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
//        order.setTotalAmount(orderDTO.getTotalAmount());
//        order.setStatus(orderDTO.getStatus());
//        order.setPaymentMethod(orderDTO.getPaymentMethod());
//        Order updatedOrder = orderRepository.save(order);
//        return new OrderDTO(updatedOrder.getId(), updatedOrder.getCustomer().getId(), updatedOrder.getUser().getId(), updatedOrder.getTotalAmount(), updatedOrder.getStatus(), updatedOrder.getPaymentMethod(), updatedOrder.getCreatedAt(), updatedOrder.getOrderItems().stream().map(orderItem -> new OrderItemDTO(orderItem.getId(), orderItem.getOrder().getId(), orderItem.getProduct().getId(), orderItem.getQuantity(), orderItem.getUnitPrice(), orderItem.getSubtotal())).collect(Collectors.toList()));
//    }
//
//    @Override
//    public void deleteOrder(Long id) {
//        orderRepository.deleteById(id);
//    }
//
//    @Override
//    public void processOrder(OrderDTO orderDTO) {
//        for (OrderItemDTO orderItemDTO : orderDTO.getOrderItems()) {
//            if (!productService.checkStock(orderItemDTO.getProductId(), orderItemDTO.getQuantity())) {
//                throw new RuntimeException("Not enough stock for product: " + orderItemDTO.getProductId());
//            }
//        }
//        for (OrderItemDTO orderItemDTO : orderDTO.getOrderItems()) {
//            productService.deductStock(orderItemDTO.getProductId(), orderItemDTO.getQuantity());
//        }
//        createOrder(orderDTO);
//    }
//}


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductService productService;

//    @Override
//    public OrderDTO createOrder(OrderDTO orderDTO) {
//        Order order = new Order();
//        order.setTotalAmount(orderDTO.getTotalAmount());
//        order.setStatus(orderDTO.getStatus());
//        order.setPaymentMethod(orderDTO.getPaymentMethod());
//        order.setCreatedAt(orderDTO.getCreatedAt());
//
//        // Map OrderItemDTOs to OrderItems
//        // Link to the order
//        List<OrderItem> orderItems = new ArrayList<>();
//        for (OrderItemDTO itemDTO : orderDTO.getOrderItems()) {
//            OrderItem orderItem = new OrderItem();
//            orderItem.setQuantity(itemDTO.getQuantity());
//            orderItem.setUnitPrice(itemDTO.getUnitPrice());
//            orderItem.setSubtotal(itemDTO.getSubtotal());
//            orderItem.setOrder(order); // Link to the order
//            OrderItem apply = orderItem;
//            orderItems.add(apply);
//        }
//
//        order.setOrderItems(orderItems);
//
//        Order savedOrder = orderRepository.save(order);
//        return mapToOrderDTO(savedOrder);
//    }

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) {
        if (orderDTO.getOrderItems() == null || orderDTO.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Order items cannot be null or empty");
        }

        Order order = new Order();
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(orderDTO.getStatus());
        order.setPaymentMethod(orderDTO.getPaymentMethod());
        order.setCreatedAt(orderDTO.getCreatedAt());

        // Map OrderItemDTOs to OrderItems
        List<OrderItem> orderItems = orderDTO.getOrderItems().stream()
                .map(orderItemDTO -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setQuantity(orderItemDTO.getQuantity());
                    orderItem.setUnitPrice(orderItemDTO.getUnitPrice());
                    orderItem.setSubtotal(orderItemDTO.getSubtotal());
                    orderItem.setOrder(order); // Link to the order
                    return orderItem;
                })
                .collect(Collectors.toList());

        order.setOrderItems(orderItems);

        Order savedOrder = orderRepository.save(order);
        return mapToOrderDTO(savedOrder);
    }

    @Override
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToOrderDTO(order);
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<OrderDTO> list = new ArrayList<>();
        for (Order order : orderRepository.findAll()) {
            System.out.println(order);
            OrderDTO orderDTO = mapToOrderDTO(order);
            list.add(orderDTO);
        }
        return list;
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO orderDTO) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(orderDTO.getStatus());
        order.setPaymentMethod(orderDTO.getPaymentMethod());

        // Update order items if needed
        List<OrderItem> orderItems = orderDTO.getOrderItems().stream()
                .map(orderItemDTO -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setQuantity(orderItemDTO.getQuantity());
                    orderItem.setUnitPrice(orderItemDTO.getUnitPrice());
                    orderItem.setSubtotal(orderItemDTO.getSubtotal());
                    orderItem.setOrder(order); // Link to the order
                    return orderItem;
                })
                .collect(Collectors.toList());

        order.setOrderItems(orderItems);

        Order updatedOrder = orderRepository.save(order);
        return mapToOrderDTO(updatedOrder);
    }

    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    @Override
    public void processOrder(OrderDTO orderDTO) {
        for (OrderItemDTO orderItemDTO : orderDTO.getOrderItems()) {
            if (!productService.checkStock(orderItemDTO.getProductId(), orderItemDTO.getQuantity())) {
                throw new RuntimeException("Not enough stock for product: " + orderItemDTO.getProductId());
            }
        }
        for (OrderItemDTO orderItemDTO : orderDTO.getOrderItems()) {
            productService.deductStock(orderItemDTO.getProductId(), orderItemDTO.getQuantity());
        }
        createOrder(orderDTO);
    }

    private OrderDTO mapToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setCustomerId(order.getCustomer().getId());
        orderDTO.setUserId(order.getUser().getId());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setPaymentMethod(order.getPaymentMethod());
        orderDTO.setCreatedAt(order.getCreatedAt());

        // Map OrderItems to OrderItemDTOs
        List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                .map(orderItem -> {
                    OrderItemDTO orderItemDTO = new OrderItemDTO();
                    orderItemDTO.setId(orderItem.getId());
                    orderItemDTO.setOrderId(orderItem.getOrder().getId());
                    orderItemDTO.setProductId(orderItem.getProduct().getId());
                    orderItemDTO.setQuantity(orderItem.getQuantity());
                    orderItemDTO.setUnitPrice(orderItem.getUnitPrice());
                    orderItemDTO.setSubtotal(orderItem.getSubtotal());
                    return orderItemDTO;
                })
                .collect(Collectors.toList());

        orderDTO.setOrderItems(orderItemDTOs);
        return orderDTO;
    }
}