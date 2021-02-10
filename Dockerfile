FROM ubuntu:focal
WORKDIR /root
CMD ["apt", "update"]
CMD ["apt", "install", "sudo", "snapd", "git", "curl", "wget", "neofetch", "vim", "nano", "gcc", "g++", "make", "man", "zsh"]
CMD ["sudo", "apt", "upgrade"]
CMD ["curl", "-sL", "https://deb.nodesource.com/setup_14.x", "|", "sudo", "-E", "bash", "-"]
CMD ["sudo", "apt", "install", "-y", "nodejs"]
CMD ["unminimize"]
CMD ["/bin/bash"]
