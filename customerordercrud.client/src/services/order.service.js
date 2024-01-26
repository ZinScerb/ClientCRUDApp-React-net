import http from "../http-common";

class OrderDataService {
    getAll() {
        return http.get("/order");
    }

    get(id) {
        return http.get(`/order/${id}`);
    }

    create(data) {
        return http.post("/order", data);
    }

    update(id, data) {
        return http.put(`/order/${id}`, data);
    }

    delete(id) {
        return http.delete(`/order/${id}`);
    }

    getOrderDetails() {
        return http.get('/order/getOrderDetails');
    }
}

export default new OrderDataService();
