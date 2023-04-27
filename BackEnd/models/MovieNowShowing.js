const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchemaNow = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  itemRate: {
    type: String,
    required: true,
  },
  Date: [
    {
      id: {
        type: Number,
        required: true,
      },
      day: {
        type: Date,
        required: true,
      },
      Location: [
        {
          id: {
            type: Number,
            required: true,
          },
          place: {
            type: String,
            required: true,
          },
          Movie_Type: [
            {
              id: {
                type: Number,
                required: true,
              },
              type_name: {
                type: String,
                required: true,
              },
              Cinema: [
                {
                  id: {
                    type: Number,
                    required: true,
                  },
                  cinema_name: {
                    type: String,
                    required: true,
                  },
                  Site: [
                    {
                      id: {
                        type: Number,
                        required: true,
                      },
                      site_name: {
                        type: String,
                        required: true,
                      },
                      Time: [
                        {
                          id: {
                            type: Number,
                            required: true,
                          },
                          timeSt: {
                            type: Date,
                            required: true,
                          },
                          Type_Chair: [
                            {
                              id: {
                                type: Number,
                                required: true,
                              },
                              type_chair_name: {
                                type: String,
                                required: true,
                              },
                              name_chair: {
                                type: String,
                                required: true,
                              },
                            },
                          ],
                          Position: [
                            [
                              {
                                id: {
                                  type: Number,
                                  required: true,
                                },
                                position: {
                                  type: String,
                                  required: true,
                                },
                                price: {
                                  type: String,
                                  required: true,
                                },
                                status: {
                                  type: String,
                                  required: true,
                                },
                              },
                            ],
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("movie", MovieSchemaNow);
