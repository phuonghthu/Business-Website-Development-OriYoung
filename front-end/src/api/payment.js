import axiosClient from "./axiosClient";

export const paymentApi = {
  checkout() {
    const body = {
      buyerName: "Kiên test",
      address: "Nhà Bè",
      phoneNumber: "0965865133",
      totalQuantity: 2,
      totalMoney: 300000,
      products: [
        {
          Id: "6591804039c3e857286b99c3",
          quantity: 2,
        },
      ],
    };
    return axiosClient.post("/payment/create-payment-intent", body);
  },
};
