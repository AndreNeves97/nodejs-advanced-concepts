EventEmitter = require('events');

const PROCESSING_STARTED = 'PROCESSING_STARTED';
const PROCESSING_FAILED = 'PROCESSING_FAILED';
const PROCESSING_SUCCESS = 'PROCESSING_SUCCESS';
const INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK';

class OrderProcessor extends EventEmitter {
  async placeOrder(order) {
    this.emit(PROCESSING_STARTED, {
      orderNumber: order.orderNumber,
    });

    const isValidOrder = await this.checkOrder(order);
    if (!isValidOrder) {
      return;
    }

    this.emit(PROCESSING_SUCCESS, {
      orderNumber: order.orderNumber,
    });
  }

  async checkOrder(order) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return order.lineItems.every((item) => {
      if (!this.hasStock(item.itemId)) {
        this.emit(PROCESSING_FAILED, {
          orderNumber: order.orderNumber,
          itemId: item.itemId,
          reason: INSUFFICIENT_STOCK,
        });

        return false;
      }

      return true;
    });
  }

  hasStock(itemId) {
    return itemId !== 3;
  }
}

module.exports = {
  OrderProcessor,
  PROCESSING_STARTED,
  PROCESSING_FAILED,
  PROCESSING_SUCCESS,
};
