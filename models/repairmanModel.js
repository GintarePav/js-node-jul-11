const mongoose = require("mongoose");
// vardą, pavardę, specializaciją, nuotrauką, miestą, bei pasirinkdamas servisą, kuriame meistras dirba
const repairmanSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "first name is mandatory"],
    },
    surname: {
      type: String,
      required: [true, "last name is mandatory"],
    },
    specialty: {
      type: String,
      required: [true, "specialty is mandatory"],
    },
    photo: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/036/280/650/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg",
    },
    city: {
      type: String,
      required: [true, "city is mandatory"],
    },
    service: {
      type: mongoose.Schema.ObjectId,
      ref: "Service",
      required: [true, "service is mandatory"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

repairmanSchema.virtual("likes", {
  ref: "Likes",
  foreignField: "repairman",
  localField: "_id",
});

const Repairman = mongoose.model("Repairman", repairmanSchema);

module.exports = Repairman;
