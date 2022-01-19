import Footer from './footer'
import Header from './header'

export default function Layout({ children,data }) {
  return (
    <>
      <Header data={data} />
      <main>{children}</main>
      <Footer data={data} />
    </>
  )
}