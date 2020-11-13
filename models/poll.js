import mongoose from 'mongoose';
import slugify from 'slugify';

const {Schema} = mongoose;

const PollSchema = new Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
            min: ['15', 'Spørsmålet må bestå av mer enn 15 tegn'],
            max: ['250', 'Spørsmålet må ha mindre enn 250 tegn'],
        },
        answers: [
            {
                answer: String,
                votes: {
                    type: Number,
                    default: 0
                }
            }
        ]
    },
    {timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}}
);

/*PollSchema.pre('save', function (next) {
    this.slug = slugify.apply(this.question, { lower: true });
    next();
});
*/

const Poll = mongoose.model('Poll', PollSchema);

export default Poll;