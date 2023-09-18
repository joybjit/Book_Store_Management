const discountModel = require("../model/discountModel");
const { success, failure } = require("../util/common");

class Discount {
  async addDiscount(req, res) {
    try {
      const { bookId, discountPercentage, activeTime, endTime } = req.body;
      const discount = await discountModel.findOne({ bookId: bookId });
      if (!discount) {
        const discountData = await discountModel.create({
          bookId,
          discountPercentage,
          activeTime,
          endTime,
        });
        return res
          .status(201)
          .send(success("Discount is Successfully Added!", discountData));
      } else {
        return res.status(401).send(failure("Book Discount is Already Added!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async updateDiscount(req, res) {
    try {
      const { bookId, discountPercentage, activeTime, endTime } = req.body;
      const discount = await discountModel.findOne({ bookId: bookId });
      if (!discount) {
        return res.status(404).send(failure("Discount Not Found"));
      }
      if (discountPercentage) {
        discount.discountPercentage = discountPercentage;
      }
      if (activeTime) {
        discount.activeTime = activeTime;
      }
      if (endTime) {
        discount.endTime = endTime;
      }
      await discount.save();

      return res
        .status(201)
        .send(success("Discount is Successfully Updated!", discount));
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
}

module.exports = new Discount();
