#include <iostream>
#include <list>
#include <SFML/Network.hpp>

int main(int argc, char** argv) {


    sf::TcpListener listener;
    sf::SocketSelector selector;
    std::list<sf::TcpSocket*> clients;

    listener.listen(8080);
    selector.add(listener);

    while(true) {
        if(selector.wait()) {
            if(selector.isReady(listener)) {
                sf::TcpSocket* client = new sf::TcpSocket;

                if(listener.accept(*client) == sf::TcpSocket::Done) {
                    clients.push_back(client);
                    selector.add(*client);
                    std::cout << clients.size() << std::endl;
                } else {
                    delete client;
                }
            } else {
                for(std::list<sf::TcpSocket *>::iterator it = clients.begin();
                    it != clients.end(); ++it) {
                    sf::TcpSocket& client = **it;

                    if(selector.isReady(client)) {
                        char buffer[1024];
                        std::size_t received = 0;

                        if(client.receive(buffer, sizeof(buffer), received) == sf::Socket::Done) {
                            
                            std::string body = "<html><head></head><body><p>Hello world !</p></body></html>";
                            std::string res = "HTTP/1.1 200 OK\n";
                            res += "Connection: Closed\n";
                            res += "Content-Length: " + std::to_string(body.size()) + "\n";
                            res += "Content-Type: text/html\n\r\n";
                            res += body;

                            client.send(res.c_str(), res.size() + 1);
                        }
                    }
                }
            }
        }
    }

    return 0;
}