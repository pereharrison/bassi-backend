import Transaction from "../model/transaction.js";

export const postTransaction = async (req, res) => {
  const { name, date, time, invoiceID, amount, status, action } = req.body;

  if (!name || !date || !time || !invoiceID || !amount || !status || !action) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const createTransaction = await Transaction.create({
      name,
      date,
      time,
      invoiceID,
      amount,
      status,
      action,
    });

    if (!createTransaction) {
      return res.status(400).json({
        success: false,
        message: "Failed to create Transaction",
      });
    }

    res.status(201).json({
      success: true,
      message: "Transaction successful!",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error occured from server!",
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const allTransactions = await Transaction.find({});

    if (!allTransactions || allTransactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Transactions not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Getting all transactions was successful!",
      data: allTransactions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong while getting transactions!",
      error: error.message,
    });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    } 

    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const deleteSpecificTransaction = async (req, res) => {
  const { invoiceID } = req.body;

  const checkForID = await Transaction.findOne({ invoiceID });
  if (!checkForID) {
    return res.status(404).json({
      success: false,
      message: "Could not find transaction",
    });
  }

  const deleteTransaction = await Transaction.findOneAndDelete({ invoiceID });
  if (!deleteTransaction) {
    return res.status(400).json({
      success: false,
      message: "Couldn't delete transaction for some reason!",
    });
  }

  res.status(200).json({
    success: true,
    message: "Transaction deleted successfully!",
  });
};
