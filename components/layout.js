import Footer from './footer'
import Header from './header'
import Head from 'next/head'
export default function Layout({ children, data }) {
    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900&display=optional"
                    rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=optional"
                    rel="stylesheet"/>
            </Head>
            <Header data={data} />
            <main>{children}</main>
            <Footer data={data} />
        </>
    )
}