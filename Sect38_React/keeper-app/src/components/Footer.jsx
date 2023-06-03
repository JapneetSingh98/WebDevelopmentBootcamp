export default function Footer() {
    const curYear = new Date().getFullYear();
    return (
        <footer>
            <p>Copyright &copy; {curYear}</p>
        </footer>
    );
}