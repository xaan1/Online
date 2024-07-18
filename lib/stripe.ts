
import Stripe from "stripe"

const stripe = new Stripe("sk_test_51PXhMQJKz0Lr5B3TfJzElMOETQXq6yiLMKns0VuRnFIbVKz4OgFVZDDz0y9QToMFhW7ter3lj4SbTJ4DRz0dcwVA00RkD4NJGc", {
  apiVersion: "2024-06-20",
  typescript : true
})


export default stripe