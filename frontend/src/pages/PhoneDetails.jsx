import { useParams } from "react-router-dom"

export default function PhoneDetails() {
    const { id } = useParams()
    return (
        <section >
            <h1 className="text-center">Apple Iphone 10</h1>
            <div>
                <div className="image">
                    <img src="https://images.frandroid.com/wp-content/uploads/2018/12/apple-iphone-xr-4.jpg" alt="" />
                </div>
                <div className="features"></div>
            </div>
        </section>
    )
}