type Props = {
  title: string
  desc: string
}

const MovieInfo = ({ title, desc }: Props) => {
  return (
    <div>
      <h3 className="text-gray-600 font-semibold">{title}</h3>
      <p>{desc}</p>
    </div>
  )
}

export default MovieInfo
