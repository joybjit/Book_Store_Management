const bookModel = require("../model/bookModel");
const { failure, success } = require("../util/common");

class Book {
  async create(req, res) {
    try {
      const {
        title,
        author,
        price,
        genre,
        year,
        pages,
        discountPercentage,
        rating,
        stock,
      } = req.body;
      const check = await bookModel.findOne({ title: title });
      // console.log(check);
      if (check) {
        return res
          .status(200)
          .send(failure("Book with Same Name Already Exists"));
      }
      const book = await bookModel.create({
        title,
        author,
        price,
        genre,
        year,
        pages,
        discountPercentage,
        rating,
        stock,
      });
      //   console.log(book);
      return res.status(200).send(success("Book is Added Successfully", book));
    } catch (err) {
      console.log("create catch");
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async getAll(req, res) {
    try {
      const book = await bookModel.find({});
      if (book.length) {
        return res
          .status(200)
          .send(success("All Books Data are Fetched!", book));
      } else {
        return res.status(404).send(failure("No Books are Found!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async getAllByFilter(req, res) {
    try {
      const {
        page,
        limit,
        sortBy,
        sortParam,
        price,
        priceFilter,
        rating,
        ratingFilter,
        stock,
        stockFilter,
        search,
      } = req.query;
      // console.log(
      //   page,
      //   limit,
      //   sort,
      //   sortParam,
      //   price,
      //   priceFilter,
      //   rating,
      //   ratingFilter,
      //   stock,
      //   stockFilter,
      //   search
      // );
      if (
        (sortParam && !sortBy) ||
        (!sortParam && sortBy) ||
        (sortParam && sortBy != "asc" && sortBy != "desc") ||
        (sortParam &&
          sortParam != "price" &&
          sortParam != "stock" &&
          sortParam != "rating" &&
          sortParam != "title" &&
          sortParam != "author" &&
          sortParam != "discountPercentage" &&
          sortParam != "year" &&
          sortParam != "pages") ||
        (price && !priceFilter) ||
        (!price && priceFilter) ||
        (priceFilter && priceFilter != "low" && priceFilter != "high") ||
        (stock && !stockFilter) ||
        (!stock && stockFilter) ||
        (stockFilter && stockFilter != "low" && stockFilter != "high") ||
        (rating && !ratingFilter) ||
        (!rating && ratingFilter) ||
        (ratingFilter && ratingFilter != "low" && ratingFilter != "high")
      ) {
        return res.status(401).send(failure("Invalid Parameters"));
      }
      if (page < 1 || limit < 1) {
        return res
          .status(401)
          .send(failure("Page and Limit value must be at least 1"));
      }
      const filters = {};
      if (price) {
        if (priceFilter === "low") filters.price = { $lt: parseInt(price) };
        else filters.price = { $gt: parseInt(price) };
      }
      if (rating) {
        if (ratingFilter === "low")
          filters.rating = { $lt: parseFloat(rating) };
        else filters.rating = { $gt: parseFloat(rating) };
      }
      if (stock) {
        if (stockFilter === "low") filters.stock = { $lt: parseInt(stock) };
        else filters.stock = { $gt: parseInt(stock) };
      }
      if (search)
        filters.$or = [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ];
      const count = await bookModel.find({}).count();
      // console.log(count);
      const allBook = await bookModel
        .find(filters)
        .sort({ [sortParam]: sort === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit ? limit : 20);
      if (allBook.length > 0) {
        return res.status(200).send(
          success("All Data is Fetched!", {
            total: count,
            totalPerPage: allProduct.length,
            pageNum: page,
            limit: limit,
            product: allProduct,
          })
        );
      } else {
        return res.status(404).send(success("No Data is Found!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
}

module.exports = new Book();
